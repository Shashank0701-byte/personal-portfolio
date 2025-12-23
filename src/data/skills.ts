export interface Skill {
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'database' | 'tool';
  proficiency?: number;
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python', icon: 'Code', category: 'language', proficiency: 90 },
  { name: 'JavaScript', icon: 'Code', category: 'language', proficiency: 95 },
  { name: 'C++', icon: 'Code', category: 'language', proficiency: 85 },
  { name: 'SQL', icon: 'Database', category: 'language', proficiency: 88 },
  
  // Frameworks & Libraries
  { name: 'React', icon: 'Atom', category: 'framework', proficiency: 95 },
  { name: 'Node.js', icon: 'Server', category: 'framework', proficiency: 90 },
  { name: 'Express.js', icon: 'Network', category: 'framework', proficiency: 88 },
  { name: 'Flask', icon: 'FlaskConic', category: 'framework', proficiency: 85 },
  { name: 'Streamlit', icon: 'Layout', category: 'framework', proficiency: 80 },
  { name: 'Pandas', icon: 'Table', category: 'framework', proficiency: 85 },
  { name: 'TensorFlow', icon: 'Brain', category: 'framework', proficiency: 75 },
  
  // Databases
  { name: 'MongoDB', icon: 'Database', category: 'database', proficiency: 90 },
  { name: 'MySQL', icon: 'Database', category: 'database', proficiency: 85 },
  { name: 'PostgreSQL', icon: 'Database', category: 'database', proficiency: 88 },
  
  // Tools & Technologies
  { name: 'Git', icon: 'GitBranch', category: 'tool', proficiency: 95 },
  { name: 'GitHub', icon: 'Github', category: 'tool', proficiency: 95 },
  { name: 'Docker', icon: 'Box', category: 'tool', proficiency: 80 },
  { name: 'AWS', icon: 'Cloud', category: 'tool', proficiency: 75 },
  { name: 'Postman', icon: 'Send', category: 'tool', proficiency: 90 },
];

export const skillsByCategory = {
  language: skills.filter(s => s.category === 'language'),
  framework: skills.filter(s => s.category === 'framework'),
  database: skills.filter(s => s.category === 'database'),
  tool: skills.filter(s => s.category === 'tool'),
};

