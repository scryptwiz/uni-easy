const { db } = require('../lib/db');
const { pastQuestions, aiQuestions, studySessions } = require('../lib/schema');

async function seedResources() {
  try {
    console.log('🌱 Seeding resources data...');

    // Seed past questions
    const pastQuestionsData = [
      {
        id: 'question-1',
        title: 'Artificial Intelligence Final Exam 2024',
        courseCode: 'CSE 401',
        course: 'Artificial Intelligence',
        year: '2024',
        semester: 'Fall',
        type: 'final',
        difficulty: 'hard',
        pages: 8,
        downloads: 156,
        rating: 4.8,
        description: 'Comprehensive final exam covering machine learning, neural networks, and AI algorithms.',
        tags: ['machine-learning', 'neural-networks', 'algorithms'],
        fileSize: '2.4 MB',
        uploadedBy: 'Dr. Smith',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'question-2',
        title: 'Real Analysis Midterm 2024',
        courseCode: 'MTH 303',
        course: 'Real Analysis',
        year: '2024',
        semester: 'Fall',
        type: 'midterm',
        difficulty: 'medium',
        pages: 6,
        downloads: 89,
        rating: 4.5,
        description: 'Midterm exam focusing on limits, continuity, and differentiation.',
        tags: ['calculus', 'limits', 'continuity'],
        fileSize: '1.8 MB',
        uploadedBy: 'Prof. Johnson',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'question-3',
        title: 'Physics II Quiz Collection 2024',
        courseCode: 'PHY 201',
        course: 'Physics II',
        year: '2024',
        semester: 'Fall',
        type: 'quiz',
        difficulty: 'easy',
        pages: 12,
        downloads: 234,
        rating: 4.2,
        description: 'Collection of weekly quizzes covering electromagnetism and thermodynamics.',
        tags: ['electromagnetism', 'thermodynamics', 'quiz'],
        fileSize: '3.1 MB',
        uploadedBy: 'Dr. Brown',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'question-4',
        title: 'Computer Architecture Assignment 2024',
        courseCode: 'CSE 501',
        course: 'Computer Architecture',
        year: '2024',
        semester: 'Fall',
        type: 'assignment',
        difficulty: 'hard',
        pages: 4,
        downloads: 67,
        rating: 4.6,
        description: 'Assignment on CPU design and memory hierarchy.',
        tags: ['cpu-design', 'memory', 'architecture'],
        fileSize: '1.2 MB',
        uploadedBy: 'Prof. Davis',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'question-5',
        title: 'Data Structures Final Exam 2023',
        courseCode: 'CSE 301',
        course: 'Data Structures',
        year: '2023',
        semester: 'Spring',
        type: 'final',
        difficulty: 'medium',
        pages: 10,
        downloads: 312,
        rating: 4.7,
        description: 'Final exam covering all data structures and algorithms taught in the course.',
        tags: ['data-structures', 'algorithms', 'programming'],
        fileSize: '2.8 MB',
        uploadedBy: 'Dr. Wilson',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ];

    // Seed AI questions
    const aiQuestionsData = [
      {
        id: 'ai-1',
        userId: 'user-1', // Replace with actual user ID
        question: 'What is the difference between supervised and unsupervised learning?',
        answer: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs, while unsupervised learning finds hidden patterns in data without labeled examples.',
        course: 'Artificial Intelligence',
        difficulty: 'medium',
        category: 'Machine Learning',
        isBookmarked: true,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: 'ai-2',
        userId: 'user-1',
        question: 'How do you calculate the derivative of a composite function?',
        answer: 'Use the chain rule: if f(x) = g(h(x)), then f\'(x) = g\'(h(x)) * h\'(x).',
        course: 'Calculus',
        difficulty: 'easy',
        category: 'Derivatives',
        isBookmarked: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'ai-3',
        userId: 'user-1',
        question: 'What is Ohm\'s Law and how is it applied in circuits?',
        answer: 'Ohm\'s Law states that V = IR, where V is voltage, I is current, and R is resistance. It\'s fundamental for analyzing electrical circuits.',
        course: 'Physics',
        difficulty: 'easy',
        category: 'Electricity',
        isBookmarked: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
      }
    ];

    // Seed study sessions
    const studySessionsData = [
      {
        id: 'session-1',
        userId: 'user-1',
        courseId: 'cse-401',
        subject: 'Machine Learning',
        duration: 90,
        isActive: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 'session-2',
        userId: 'user-1',
        courseId: 'mth-303',
        subject: 'Calculus',
        duration: 75,
        isActive: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
      },
      {
        id: 'session-3',
        userId: 'user-1',
        courseId: 'phy-201',
        subject: 'Electromagnetism',
        duration: 120,
        isActive: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: 'session-4',
        userId: 'user-1',
        courseId: 'cse-401',
        subject: 'Neural Networks',
        duration: 45,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert data
    await db.insert(pastQuestions).values(pastQuestionsData);
    console.log('✅ Past questions seeded');

    await db.insert(aiQuestions).values(aiQuestionsData);
    console.log('✅ AI questions seeded');

    await db.insert(studySessions).values(studySessionsData);
    console.log('✅ Study sessions seeded');

    console.log('🎉 Resources seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding resources:', error);
  }
}

// Run the seeding function
seedResources();
