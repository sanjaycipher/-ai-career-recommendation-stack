import Career from '../models/Career.js';

export const careersData = [
  {
    title: 'Full Stack Developer',
    description: 'Builds end-to-end web applications covering user interfaces, server logic, database interactions, and API design. Coordinates full software delivery cycles from visual presentation to data layer persistence. Frequently operates across agile product teams delivering rapid iterations.',
    typical_work_experience: 'any',
  },
  {
    title: 'Frontend Developer',
    description: 'Specializes in user interface development, accessibility, performance optimization, and responsive design patterns. Implements dynamic user experiences utilizing modern component libraries and reactive state management. Collaborates closely with UI/UX designers and product managers to bring wireframes to life.',
    typical_work_experience: 'any',
  },
  {
    title: 'Backend Developer',
    description: 'Architects robust server-side systems, business logic, microservices, and database models. Focuses on data integrity, API performance, authentication mechanisms, and external system integrations. Ensures backend services scale securely under high transaction loads.',
    typical_work_experience: 'any',
  },
  {
    title: 'Software Engineer',
    description: 'Applies comprehensive computer science fundamentals to design, implement, and maintain scalable software applications. Writes clean, modular code backed by automated testing, architectural patterns, and continuous integration. Solves complex algorithmic challenges across varied domain boundaries.',
    typical_work_experience: 'any',
  },
  {
    title: 'Mobile App Developer',
    description: 'Creates cross-platform or native applications tailored for iOS and Android mobile platforms. Optimizes mobile user interfaces, network latency, local storage, and offline synchronization capabilities. Coordinates application store submission processes, lifecycle monitoring, and push notification services.',
    typical_work_experience: '0-1',
  },
  {
    title: 'Data Analyst',
    description: 'Extracts, inspects, and interprets complex data sets to help organizations make informed business decisions. Creates interactive dashboards, reports, and visualizations using analytical queries and statistical techniques. Bridges technical data infrastructure with business stakeholder requirements.',
    typical_work_experience: 'internship',
  },
  {
    title: 'Data Scientist',
    description: 'Combines statistical modeling, machine learning algorithms, and exploratory data analysis to uncover predictive patterns in large data sets. Experiments with structured and unstructured data to build automated predictive systems and quantitative models. Translates abstract business questions into testable mathematical hypotheses.',
    typical_work_experience: '0-1',
  },
  {
    title: 'Machine Learning Engineer',
    description: 'Designs, trains, and operationalizes production machine learning pipelines and deep learning models at scale. Bridges theoretical data science research with robust software engineering and MLOps practices. Evaluates model latency, accuracy degradation, and real-time inference throughput in cloud environments.',
    typical_work_experience: '1-3',
  },
  {
    title: 'AI Engineer',
    description: 'Develops next-generation cognitive systems by fine-tuning neural architectures and integrating modern LLM APIs into enterprise applications. Builds autonomous agents, semantic retrieval pipelines, and multimodal inference workflows. Focuses on prompt engineering, safety guardrails, and context-aware intelligence.',
    typical_work_experience: '1-3',
  },
  {
    title: 'DevOps Engineer',
    description: 'Automates deployment pipelines, cloud provisioning, and container orchestration to accelerate software release cycles. Cultivates shared reliability practices across development and infrastructure teams through CI/CD pipelines. Champions infrastructure-as-code and environment reproducibility.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Cloud Engineer',
    description: 'Provisions, configures, and administers scalable multi-region cloud infrastructure and networking resources. Implements identity management, storage tiers, serverless functions, and cost optimization policies. Ensures high availability and fault tolerance across public cloud providers.',
    typical_work_experience: '0-1',
  },
  {
    title: 'Site Reliability Engineer',
    description: 'Applies software engineering disciplines to infrastructure and system operations to maximize system uptime and reliability. Defines service level objectives (SLOs), mitigates systemic outages, and conducts blameless incident post-mortems. Automates routine operational toil through resilient self-healing tooling.',
    typical_work_experience: '3-plus',
  },
  {
    title: 'Security Engineer',
    description: 'Safeguards applications, networks, and cloud infrastructures against vulnerabilities, intrusion attempts, and data breaches. Conducts threat modeling, security code reviews, vulnerability scans, and cryptographic implementation audits. Coordinates incident response procedures and enforces regulatory compliance frameworks.',
    typical_work_experience: '1-3',
  },
  {
    title: 'QA / Test Automation Engineer',
    description: 'Designs and executes comprehensive end-to-end testing strategies, test suites, and automated verification frameworks. Validates API contracts, user interface workflows, system edge cases, and performance regressions. Collaborates directly with development squads to maintain defect-free releases.',
    typical_work_experience: 'any',
  },
  {
    title: 'UI/UX Designer',
    description: 'Crafts intuitive user journeys, interactive wireframes, design systems, and high-fidelity product prototypes. Conducts user research, usability evaluations, and visual hierarchy reviews to optimize customer satisfaction. Works alongside engineering teams to ensure pixel-perfect interface implementations.',
    typical_work_experience: 'any',
  },
  {
    title: 'Product Manager',
    description: 'Guides product strategy, roadmaps, and feature prioritization by aligning technical feasibility, business goals, and user feedback. Translates customer discovery insights into actionable engineering requirements and agile user stories. Drives cross-functional alignment between engineering, design, and executive leadership.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Database Administrator',
    description: 'Oversees database integrity, indexing strategies, backup restorations, replication, and query execution performance. Manages relational and NoSQL storage systems to ensure continuous availability and data durability. Enforces strict schema governance, disaster recovery protocols, and encryption standards.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Data Engineer',
    description: 'Constructs reliable data pipelines, distributed extract-transform-load (ETL) workflows, and scalable data warehouse layers. Manages high-throughput message streams and optimizes query engines for downstream analytics teams. Guarantees data cleanliness, governance, and low-latency delivery at enterprise scale.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Blockchain Developer',
    description: 'Develops decentralized applications, smart contract protocols, and cryptographically verified consensus mechanisms. Audits smart contract code against reentrancy and economic exploit vectors. Integrates Web3 client libraries with decentralized storage and public distributed ledger networks.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Game Developer',
    description: 'Engineers interactive video game mechanics, physics simulations, 3D graphics rendering, and audio systems. Collaborates with artists, animators, and level designers to deliver engaging realtime player experiences. Optimizes memory utilization and frame rates for PC, console, and mobile gaming hardware.',
    typical_work_experience: 'any',
  },
  {
    title: 'Embedded Systems Engineer',
    description: 'Programs microcontrollers, real-time operating systems (RTOS), and firmware that interface directly with hardware sensors and actuators. Troubleshoots low-level communication protocols such as I2C, SPI, and UART using diagnostic instruments. Designs low-power firmware for IoT gadgets, consumer electronics, and automotive computers.',
    typical_work_experience: '0-1',
  },
  {
    title: 'Business Intelligence Analyst',
    description: 'Transforms multi-source enterprise data into strategic visualizations, KPI dashboards, and executive reporting models. Analyzes historical performance trends to forecast organizational revenue, efficiency, and market expansion opportunities. Translates intricate relational metrics into clear narrative stories for executive decision makers.',
    typical_work_experience: 'any',
  },
  {
    title: 'Technical Writer',
    description: 'Produces comprehensive API documentation, architecture guides, software tutorials, and developer portals. Translates complicated engineering concepts into lucid, concise, and accessible technical content for diverse audiences. Coordinates with developers and product managers to keep documentation synchronized with code updates.',
    typical_work_experience: 'any',
  },
  {
    title: 'Solutions Architect',
    description: 'Designs holistic enterprise architecture blueprints spanning software services, cloud networks, security, and data governance. Evaluates technical tradeoffs, migration strategies, and total cost of ownership for mission-critical IT transformations. Advises executive stakeholders and engineering directors on strategic technology roadmaps.',
    typical_work_experience: '3-plus',
  },
  {
    title: 'Systems Analyst',
    description: 'Investigates organizational IT infrastructure and operational workflows to identify performance bottlenecks and software upgrade opportunities. Specifies system boundary requirements, data flows, and technical integration specifications for developer teams. Validates that proposed technical solutions fulfill complex enterprise business requirements.',
    typical_work_experience: 'any',
  },
  {
    title: 'Robotics Engineer',
    description: 'Builds autonomous robotic systems combining mechanical control theory, sensory perception, and motion planning software. Implements inverse kinematics, obstacle avoidance, and feedback control loops for industrial robots or drones. Integrates camera feeds and telemetry sensors with embedded computing units.',
    typical_work_experience: '1-3',
  },
  {
    title: 'Computer Vision Engineer',
    description: 'Develops vision algorithms that extract meaningful semantic information from images, video streams, and point clouds. Implements convolutional neural networks and spatial transformers for object detection, segmentation, and facial recognition. Optimizes deep learning inference pipelines for edge hardware and real-time video feeds.',
    typical_work_experience: '1-3',
  },
  {
    title: 'NLP Engineer',
    description: 'Builds natural language processing pipelines for text classification, sentiment analysis, entity extraction, and machine translation. Trains tokenizers, transformer language models, and semantic vector embeddings for domain-specific applications. Optimizes conversational agents and context-retrieval architectures for speed and precision.',
    typical_work_experience: '1-3',
  },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;

  for (const item of careersData) {
    const [record, created] = await Career.findOrCreate({
      where: { title: item.title },
      defaults: item,
    });

    if (created) {
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`[04-careers] Careers seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${careersData.length})`);
  return { created: createdCount, skipped: skippedCount, total: careersData.length };
}

export default seed;
