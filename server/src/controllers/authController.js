import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { validateRegisterInput, validateLoginInput } from '../utils/validate.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input payload
    const validationError = validateRegisterInput({ name, email, password });
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already in use
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'A user with this email address already exists',
      });
    }

    // Hash password with bcryptjs (10 salt rounds)
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Validate role if provided, otherwise default to 'student'
    const validRoles = ['student', 'admin'];
    const assignedRole = role && validRoles.includes(role) ? role : 'student';

    // Create user in MySQL
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password_hash,
      role: assignedRole,
    });

    // Generate JWT token with payload: { id, email, role }
    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Ensure password_hash is never returned
    const userSafe = newUser.toSafeObject();

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: userSafe,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Log in an existing user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input payload
    const validationError = validateLoginInput({ email, password });
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Retrieve user including password_hash scope
    const user = await User.scope('withPassword').findOne({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Generate JWT token with payload: { id, email, role }
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Ensure password_hash is never returned
    const userSafe = user.toSafeObject();

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: userSafe,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Return current authenticated user
 * GET /api/auth/me (Protected)
 */
export const me = async (req, res) => {
  // req.user is supplied by the auth middleware and already excludes password_hash
  const userSafe = typeof req.user.toSafeObject === 'function' ? req.user.toSafeObject() : req.user;

  return res.status(200).json({
    success: true,
    data: {
      user: userSafe,
    },
  });
};
