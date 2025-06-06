import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleTexts = [
  // ===== BEGINNER LEVEL =====
  
  // Beginner - Home Row - No Numbers - No Special Chars
  {
    title: 'Home Row Foundation Practice',
    content: 'Dad had a sad lad ask for a glass. Flash the flag and dash fast. Glad lasses shall add glass jars. Small halls fall as flags flash. Ask dad if lads shall dash. Glass halls shall last as lasses add flags. Sad lads had glad dads ask for small glass jars. Flash flags fast as halls fall. Glad lasses shall dash as dads ask. Small flags fall fast as glass halls flash. Ask lads if sad dads shall add glass. Halls fall as glad lasses dash fast. Flash small flags as glass jars fall. Sad dads ask lads if halls shall last. Glad lasses add glass as flags flash fast.',
    difficulty: 'beginner' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Home Row Daily Words',
    content: 'Ask dad if the glass shall fall. Lads dash fast as flags flash. Glad lasses add small jars. Halls shall last as dads ask. Flash flags fast and dash. Glass jars fall as lads ask. Sad dads shall add glass halls. Lasses dash fast as flags fall. Ask if glad lads shall flash. Small halls fall as glass jars dash. Flags flash fast as sad lasses ask. Dads add glass as halls fall. Lads shall dash as flags flash fast. Glad halls last as lasses add glass. Ask sad dads if small flags shall fall. Glass jars flash as lads dash fast. Halls add glass as glad flags fall.',
    difficulty: 'beginner' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Home Row Simple Stories',
    content: 'A sad lad had a glad dad. Ask the lass if she shall dash. Glass halls fall as flags flash. Small jars add glass as lads ask. Dads shall flash flags fast. Lasses dash as halls fall. Ask if glad lads shall add glass. Sad flags fall as dads dash. Halls last as lasses ask. Flash glass jars as lads fall. Glad dads add small flags. Ask lasses if halls shall dash. Glass falls as sad lads flash. Flags add halls as dads ask. Lasses shall dash as glass falls fast. Small dads ask if lads shall add flags. Halls flash as glad glass jars fall.',
    difficulty: 'beginner' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Beginner - Home Row - With Numbers - No Special Chars
  {
    title: 'Home Row Numbers Introduction',
    content: 'Dad has 1 glass and 2 flags. Ask for 3 jars and 4 halls. Lads dash 5 times as 6 lasses flash. Glad dads add 7 glass jars and 8 flags. Ask if 9 halls shall last 10 days. Flash 11 flags as 12 lads dash fast. Glass jars fall 13 times as 14 dads ask. Lasses add 15 halls and 16 small flags. Ask 17 glad lads if 18 glass jars shall fall. Dads flash 19 flags as 20 halls dash. Sad lasses ask for 21 glass jars and 22 flags. Halls last 23 days as 24 lads add glass. Flash 25 flags fast as 26 dads ask. Glad lasses dash 27 times as 28 halls fall.',
    difficulty: 'beginner' as const,
    keyboardRow: 'home' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Home Row Counting Practice',
    content: 'Ask dad for 1 flag and 2 glass jars. Lads shall dash 3 times as 4 halls flash. Glad lasses add 5 flags and 6 glass halls. Dads ask if 7 lads shall dash 8 times. Flash 9 glass jars as 10 flags fall fast. Halls last 11 days as 12 lasses add glass. Ask 13 glad dads if 14 flags shall flash. Lads dash 15 times as 16 glass jars fall. Sad lasses ask for 17 halls and 18 flags. Dads add 19 glass jars as 20 lads flash. Glad halls last 21 days as 22 flags dash. Ask if 23 lasses shall add 24 glass jars. Flash 25 flags fast as 26 halls fall.',
    difficulty: 'beginner' as const,
    keyboardRow: 'home' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Beginner - Upper Row - No Numbers - No Special Chars
  {
    title: 'Upper Row Word Building',
    content: 'We try to type pretty poetry every day. You put out quiet reports with proper requirements. Write poetry that protects territory opportunities. Try to repeat pretty words with quiet power. Put out reports that require proper territory. Type poetry with pretty requirements every day. We write quiet reports with proper power. You try to protect territory opportunities with poetry. Put pretty words out with quiet requirements. Type reports that repeat proper territory power. We try poetry with pretty quiet requirements. You put out words that protect territory opportunities. Write reports with proper pretty poetry every day. Try to type quiet words with territory power. Put poetry out with pretty proper requirements.',
    difficulty: 'beginner' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Upper Row Professional Words',
    content: 'Type proper reports with priority requirements every week. Write poetry that protects equity opportunities. You put out quiet territory reports with power. We try to repeat pretty words with proper requirements. Type reports that require territory protection every day. Write pretty poetry with quiet power and equity. You put proper requirements out with territory opportunities. Try to type reports with pretty quiet words. We write poetry that protects proper territory power. Put out reports with pretty requirements every week. Type quiet words with proper territory protection. You try poetry with pretty power and equity. Write reports that require quiet territory opportunities. Put proper words out with pretty poetry power.',
    difficulty: 'beginner' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Upper Row Creative Writing',
    content: 'Pretty poetry protects quiet territory with power every day. We write reports that require proper equity opportunities. You type words with pretty quiet requirements. Try to put poetry out with proper territory power. Write reports that protect pretty opportunities every week. Type quiet words with proper poetry requirements. We put reports out with pretty territory power. You try poetry with quiet proper equity. Write words that protect territory opportunities every day. Type pretty reports with quiet power requirements. Put poetry out with proper territory protection. We try words with pretty quiet opportunities. You write reports that require proper territory power. Type poetry with pretty quiet equity every week.',
    difficulty: 'beginner' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Beginner - Upper Row - With Numbers - No Special Chars
  {
    title: 'Upper Row Numbers Practice',
    content: 'We type 1 report and 2 poetry pieces every week. You put out 3 requirements with 4 territory opportunities. Write 5 pretty reports with 6 proper words. Try to type 7 poetry pieces and 8 quiet reports. Put 9 requirements out with 10 territory power. We write 11 reports that protect 12 opportunities. You type 13 pretty words with 14 proper requirements. Try 15 poetry pieces with 16 quiet territory power. Write 17 reports that require 18 proper opportunities. Put 19 pretty words out with 20 territory requirements. Type 21 reports with 22 quiet poetry pieces. We try 23 words with 24 proper territory power. You write 25 pretty reports with 26 opportunities.',
    difficulty: 'beginner' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Upper Row Business Numbers',
    content: 'Type 1 proper report with 2 territory requirements. We write 3 poetry pieces and 4 quiet opportunities. You put 5 reports out with 6 pretty words. Try to type 7 requirements with 8 proper territory. Write 9 poetry pieces with 10 quiet power. Put 11 pretty reports out with 12 opportunities. Type 13 words with 14 proper territory requirements. We try 15 poetry pieces with 16 quiet reports. You write 17 pretty words with 18 territory power. Put 19 reports out with 20 proper opportunities. Type 21 quiet words with 22 pretty requirements. Try 23 poetry pieces with 24 territory power. Write 25 reports with 26 proper quiet opportunities.',
    difficulty: 'beginner' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Beginner - Lower Row - No Numbers - No Special Chars
  {
    title: 'Lower Row Basic Practice',
    content: 'Zoom cameras can mix cabbage with boxes every day. Van drivers ban mixing cabbage in boxes. Examine cabbage boxes with zoom cameras. Mix cabbage and ban boxing in vans. Zoom in on cabbage boxes with cameras. Van drivers can examine mixed cabbage boxes. Ban boxing cabbage in zoom camera vans. Mix cabbage boxes and examine with cameras. Zoom cameras ban mixing cabbage in vans. Examine boxes with cabbage and zoom cameras. Van drivers mix cabbage boxes every day. Ban zoom cameras in cabbage boxing vans. Mix cabbage and examine boxes with cameras. Zoom in on van cabbage boxes. Ban mixing cabbage with zoom cameras in vans.',
    difficulty: 'beginner' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Lower Row Word Combinations',
    content: 'Box cabbage and mix with zoom cameras. Van drivers can ban cabbage boxing. Examine mixed cabbage in zoom boxes. Ban van drivers from mixing cabbage. Zoom cameras examine cabbage boxes every day. Mix cabbage and ban boxing in vans. Van drivers zoom in on cabbage boxes. Ban mixing cabbage with zoom cameras. Box cabbage and examine with van cameras. Zoom in on mixed cabbage boxes. Van drivers ban cabbage boxing cameras. Mix cabbage boxes and zoom in. Ban van cabbage with zoom cameras. Examine boxing cabbage in mixed vans. Zoom cameras can ban cabbage boxing.',
    difficulty: 'beginner' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Lower Row Simple Sentences',
    content: 'Mix cabbage in boxes with zoom cameras. Van drivers examine cabbage boxing every day. Ban mixing cabbage with van cameras. Zoom in on cabbage boxes and examine. Van drivers can mix cabbage boxes. Ban zoom cameras in cabbage boxing. Mix cabbage and examine van boxes. Zoom cameras ban cabbage boxing vans. Van drivers examine mixed cabbage boxes. Ban boxing cabbage with zoom cameras. Mix cabbage boxes in van cameras. Zoom in on cabbage boxing vans. Van drivers ban mixed cabbage boxes. Examine cabbage with zoom boxing cameras. Mix van cabbage and ban boxing.',
    difficulty: 'beginner' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Beginner - Lower Row - With Numbers - No Special Chars
  {
    title: 'Lower Row Numbers Integration',
    content: 'Zoom 1 camera and mix 2 cabbage boxes. Van drivers ban 3 cabbage boxing and examine 4 cameras. Mix 5 cabbage boxes with 6 zoom cameras. Ban 7 van drivers from boxing 8 cabbage boxes. Examine 9 cabbage boxes with 10 zoom cameras. Van drivers mix 11 cabbage and ban 12 boxing. Zoom 13 cameras in on 14 cabbage boxes. Ban 15 van drivers from mixing 16 cabbage. Examine 17 cabbage boxes with 18 zoom cameras. Mix 19 cabbage and ban 20 van boxing. Zoom 21 cameras and examine 22 cabbage boxes. Van drivers ban 23 cabbage boxing with 24 cameras.',
    difficulty: 'beginner' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Lower Row Counting Exercise',
    content: 'Mix 1 cabbage box and zoom 2 cameras. Ban 3 van drivers from boxing 4 cabbage. Examine 5 cabbage boxes with 6 zoom cameras. Van drivers mix 7 cabbage and ban 8 boxing. Zoom 9 cameras in on 10 cabbage boxes. Ban 11 van drivers from mixing 12 cabbage. Examine 13 cabbage boxes with 14 cameras. Mix 15 cabbage and zoom 16 van cameras. Ban 17 cabbage boxing with 18 zoom cameras. Van drivers examine 19 cabbage boxes and mix 20. Zoom 21 cameras and ban 22 cabbage boxing. Mix 23 cabbage boxes with 24 van cameras.',
    difficulty: 'beginner' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Beginner - All Rows - No Numbers - No Special Chars
  {
    title: 'Complete Keyboard Introduction',
    content: 'The quick brown fox jumps over the lazy dog and runs through the forest with great speed while birds sing beautiful songs. Every morning we wake up early to practice typing skills and improve our keyboard technique. Students learn to type faster by practicing daily exercises that include all letters of the alphabet. Teachers recommend typing practice sessions that focus on accuracy before speed development. Modern computers require good typing skills for efficient work and communication. Practice makes perfect when learning to type without looking at the keyboard. Proper finger placement helps develop muscle memory for faster typing. Regular practice sessions improve both speed and accuracy over time.',
    difficulty: 'beginner' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Daily Life Typing',
    content: 'Good morning everyone and welcome to our typing practice session today. We will learn to type common words and phrases that we use in daily life. Students should focus on proper finger placement and maintain good posture while typing. Practice typing simple sentences about family, friends, school, and work activities. Remember to keep your wrists straight and fingers curved over the keyboard. Take breaks between practice sessions to avoid fatigue and maintain concentration. Typing skills are essential for modern communication and computer work. Regular practice helps develop speed and accuracy in keyboard typing. Focus on quality rather than speed when starting to learn typing techniques.',
    difficulty: 'beginner' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Learning Journey',
    content: 'Learning to type is an important skill for students and professionals in the modern world. Start with basic finger exercises and gradually increase typing speed through regular practice. Focus on accuracy first and speed will naturally improve over time with consistent effort. Use proper typing techniques including correct finger placement and good posture while sitting. Practice typing common words and phrases that appear frequently in everyday writing. Take regular breaks to rest your hands and maintain focus during practice sessions. Set realistic goals for improvement and track your progress over time. Remember that everyone learns at their own pace so be patient with yourself.',
    difficulty: 'beginner' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Beginner - All Rows - With Numbers - No Special Chars
  {
    title: 'Numbers in Daily Life',
    content: 'There are 7 days in a week and 12 months in a year with 365 days total. We have 24 hours each day and 60 minutes in each hour. Students attend school for about 8 hours and sleep for 8 hours each day. A typical work week consists of 5 days with 2 days for weekend rest. Most people eat 3 meals per day and drink 8 glasses of water. The human body has 206 bones and 32 teeth when fully developed. A standard keyboard has 104 keys including 26 letters and 10 numbers. Practice typing numbers from 0 to 9 along with letters for complete keyboard skills. Remember to use the correct fingers for each number key.',
    difficulty: 'beginner' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Simple Mathematics',
    content: 'Add 2 plus 3 to get 5 and multiply 4 times 6 to get 24 as basic math. Subtract 10 minus 7 to get 3 and divide 20 by 4 to get 5 for simple calculations. Count from 1 to 100 by tens which gives us 10 20 30 40 50 60 70 80 90 100. Practice typing phone numbers like 555 123 4567 and addresses like 123 Main Street. Years like 2024 and 2025 are important dates to remember and type correctly. Simple fractions include 1 half 1 third 1 fourth and 1 fifth for basic understanding. Temperature can be 32 degrees for freezing and 212 degrees for boiling water. Practice typing ages like 5 years old 10 years old 15 years old and 20 years old.',
    difficulty: 'beginner' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // ===== INTERMEDIATE LEVEL =====

  // Intermediate - Home Row - No Numbers - No Special Chars
  {
    title: 'Home Row Advanced Combinations',
    content: 'Flashlights shall flash through glass halls as lads and lasses ask their dads for guidance. Small flags fall fast while glad jazz musicians shall last through the night. Grass grows in halls where lasses dash quickly past glass doors. Ask dads if flashlights shall flash glass halls fast enough for the lads. Glad lasses shall add glass jars to small halls where flags fall. Jazz halls shall last as long as grass grows and flags flash. Lads ask if sad dads shall add flashlights to glass halls. Small flags fall fast as glad lasses dash through grass halls. Glass jars shall last in halls where jazz lads ask dads. Flashlights flash fast as lasses add glass to small halls.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Home Row Complex Sentences',
    content: 'Shall flashlights flash through glass halls fast enough for lads and lasses to dash safely. Lads ask glad lasses if small flags shall fall as jazz music fills the halls. Glass jars add elegance to halls where dads and lasses gather for jazz performances. Ask if sad dads shall add flashlights to small glass halls where flags flash. Glad jazz musicians shall last through performances in grass covered halls. Lasses dash fast through halls where small flags fall and glass jars sparkle. Flashlights shall flash as lads ask dads about glass halls and jazz music. Small grass areas add beauty to halls where glad lasses and dads gather.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Intermediate - Home Row - With Numbers - No Special Chars
  {
    title: 'Home Row Statistical Data',
    content: 'Flash 12 glass halls and ask 34 glad lads to dash through grass areas. Small flags fall 56 times while jazz lasts 78 hours in glass halls. Lasses add 90 glass jars to halls where 123 dads ask about flashlights. Glad jazz musicians shall last 456 hours in halls with 789 small flags. Ask if 101 lads shall dash through 202 glass halls with flashlights. Sad dads add 303 glass jars while 404 lasses flash flags fast. Halls shall last 505 days as 606 glad lads ask about jazz. Flash 707 flags fast while 808 lasses dash through grass halls. Glass jars last 909 days in halls where 111 dads add flashlights.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'home' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Intermediate - Upper Row - No Numbers - No Special Chars
  {
    title: 'Upper Row Professional Communication',
    content: 'Write proper reports with priority requirements that protect territory opportunities and equity. Type pretty poetry with quiet power that requires proper territory protection every week. Put out reports with pretty requirements that repeat territory opportunities. We try to write poetry that protects proper equity with quiet power. You put proper requirements out with territory opportunities that require protection. Type reports that repeat pretty words with quiet territory power every day. Write poetry with proper requirements that protect equity opportunities. Try to put reports out with pretty territory power and quiet requirements. We type poetry that requires proper protection with pretty opportunities. You write reports with quiet power that repeat territory requirements.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Upper Row Business Writing',
    content: 'Prepare proper reports that require priority attention and territory protection every quarter. Write pretty poetry with quiet power that protects equity opportunities. Type requirements that repeat proper territory protection with quiet power. We try poetry with pretty words that require proper equity protection. You put reports out with territory opportunities that protect proper requirements. Write poetry that requires quiet power with pretty territory protection. Type proper reports with requirements that repeat equity opportunities. Try to put poetry out with quiet territory power and proper protection. We write reports that require pretty words with territory opportunities. You type poetry with proper power that protects quiet equity.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Intermediate - Upper Row - With Numbers - No Special Chars
  {
    title: 'Upper Row Data Reports',
    content: 'Write 25 reports with 30 requirements that protect 45 territory opportunities. Type 67 pretty poetry pieces with 89 quiet power requirements. Put 101 reports out with 202 territory opportunities that require 303 protection. We try 404 poetry pieces with 505 pretty words and 606 requirements. You write 707 reports with 808 quiet power and 909 territory protection. Type 111 requirements that repeat 222 proper territory opportunities. Write 333 poetry pieces with 444 pretty words and 555 quiet power. Try to put 666 reports out with 777 territory requirements and 888 protection. We type 999 poetry pieces that require 123 proper equity opportunities. You write 456 reports with 789 quiet territory power and protection.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Intermediate - Lower Row - No Numbers - No Special Chars
  {
    title: 'Lower Row Complex Operations',
    content: 'Boxing examples demonstrate how to mix cabbage with precision and examine results carefully. Zoom cameras can capture detailed images of cabbage boxing techniques and mixing procedures. Van drivers examine cabbage boxes while maintaining proper safety protocols and procedures. Mix cabbage boxing techniques with zoom camera examination for comprehensive documentation. Ban unsafe cabbage boxing practices and examine proper mixing techniques with cameras. Zoom in on cabbage boxing examples and mix documentation with examination procedures. Van drivers can examine mixed cabbage boxes using zoom cameras for quality control. Boxing cabbage requires careful examination and mixing with proper zoom camera documentation.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Intermediate - Lower Row - With Numbers - No Special Chars
  {
    title: 'Lower Row Inventory Management',
    content: 'Box 15 cabbage examples and mix 27 items while examining 38 zoom cameras. Van drivers examine 49 cabbage boxes and mix 56 items with 67 cameras. Ban 78 unsafe boxing practices and examine 89 cabbage mixing procedures. Zoom 101 cameras in on 202 cabbage boxes while mixing 303 examples. Van drivers box 404 cabbage items and examine 505 mixing procedures. Mix 606 cabbage examples with 707 zoom cameras and ban 808 unsafe practices. Examine 909 cabbage boxes while boxing 111 items and mixing 222 examples. Van drivers zoom 333 cameras and examine 444 cabbage boxing procedures.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // Intermediate - All Rows - No Numbers - No Special Chars
  {
    title: 'Professional Email Communication',
    content: 'Dear colleagues and team members, I hope this email finds you well and in good health today. Please find attached the quarterly report for your careful review and detailed feedback. We have made significant progress on our current projects and initiatives this quarter. The team has worked diligently to meet all deadlines and quality standards. I would appreciate your thoughts and suggestions on the proposed changes and improvements. Please let me know if you have any questions or concerns about the report. We will schedule a meeting next week to discuss the findings and recommendations. Thank you for your continued support and dedication to our shared goals and objectives.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Technical Documentation Writing',
    content: 'Functions are reusable blocks of code that perform specific tasks and operations within software applications. Variables store data values that can be changed during program execution and processing. Object oriented programming uses classes and objects to organize code structure and functionality. Database management systems store and retrieve information efficiently for applications and users. Software development requires careful planning, testing, and documentation for successful project completion. User interface design focuses on creating intuitive and accessible experiences for all users. Quality assurance testing ensures that software meets requirements and functions correctly. Version control systems help teams collaborate and track changes in code development projects.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },
  {
    title: 'Academic Research Writing',
    content: 'Research methodology involves systematic investigation to establish facts and reach new conclusions about various phenomena. Data collection requires careful planning and execution to ensure accuracy and reliability of results. Statistical analysis helps researchers identify patterns and relationships within collected data sets. Literature review examines existing research to understand current knowledge and identify gaps. Hypothesis formation guides research direction and provides framework for investigation and analysis. Peer review process ensures quality and validity of research findings before publication. Academic writing requires clear communication of complex ideas and concepts to diverse audiences. Research ethics protect participants and ensure integrity throughout the investigation process.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: false,
  },

  // Intermediate - All Rows - With Numbers - No Special Chars
  {
    title: 'Statistical Analysis Report',
    content: 'The comprehensive survey included 1234 participants aged 18 to 65 years from diverse backgrounds. Results showed 78 percent satisfaction rate with 95 percent confidence interval. Data analysis revealed 456 positive responses and 789 neutral responses from participants. The study duration was 12 months with 52 weekly data collection sessions. Response rate reached 87 percent with 234 participants completing all survey sections. Statistical significance was achieved with p value less than 0.05 in 15 categories. Sample size calculation indicated minimum 800 participants needed for 90 percent power. Final analysis included 1100 complete responses with 134 partial responses excluded.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Financial Performance Data',
    content: 'Revenue increased from 2500000 to 3200000 dollars representing 28 percent growth year over year. Profit margins improved by 15 percent over the last 12 months of operations. Operating expenses decreased from 1800000 to 1650000 dollars through efficiency improvements. The company served 45000 customers with 92 percent satisfaction rating this quarter. Sales team achieved 110 percent of target with 234 new client acquisitions. Marketing budget of 450000 dollars generated 1200000 dollars in new revenue. Employee count increased from 150 to 180 staff members during expansion period. Net profit reached 1550000 dollars exceeding projections by 23 percent.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },
  {
    title: 'Scientific Measurement Data',
    content: 'The controlled experiment lasted 72 hours with temperature maintained at 25 degrees celsius. We recorded 156 observations every 30 minutes throughout the study period. Sample size included 240 specimens divided into 8 groups of 30 each. Measurement accuracy was within 0.5 percent with calibrated instruments checked every 4 hours. Data collection occurred over 14 days with 168 total measurement sessions. Results showed 89 percent correlation between variables with 12 outliers identified. Statistical analysis included 1680 data points with 95 percent confidence intervals. Final report documented 234 significant findings across 16 experimental conditions.',
    difficulty: 'intermediate' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: false,
  },

  // ===== ADVANCED LEVEL =====

  // Advanced - Home Row - No Numbers - With Special Chars
  {
    title: 'Home Row Punctuation Mastery',
    content: 'Flash! Glass halls shall fall as lads dash fast. Ask, "Shall glad lasses add glass jars?" Small flags flash; halls fall fast. "Dad," ask lasses, "shall glass halls last?" Glad jazz fills halls; flags flash fast. Ask: "Shall lads dash?" Glass jars fall; lasses add flags. "Flash flags fast!" dad asks. Halls shall last; glass jars flash. Lads ask, "Shall glad lasses dash?" Small flags fall; jazz fills halls. "Glass halls flash fast," lasses say. Ask dad: "Shall flags last?" Glad lads dash; halls fall fast. "Jazz shall last," ask lasses. Flash glass; flags fall fast. "Shall halls last?" ask glad dads. Lasses flash; glass halls fall. "Ask dad," lads say, "shall flags last?" Glad jazz; small halls dash fast.',
    difficulty: 'advanced' as const,
    keyboardRow: 'home' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },

  // Advanced - Home Row - With Numbers - With Special Chars
  {
    title: 'Home Row Complete Integration',
    content: 'Flash 12 halls! Ask "Shall 34 lads dash fast?" Glad jazz; 56 flags fall. "Glass halls," ask 78 lasses, "shall last 90 days?" Flash! 123 flags fall; lads dash. Ask: "Shall 456 glass jars last?" Glad dads; 789 halls flash fast. "Jazz shall last 101 hours," lasses say. Flash 202 flags; ask "Shall 303 lads dash?" Glass halls; 404 jars fall fast. "Shall 505 flags last?" ask 606 glad dads. Flash! 707 lasses dash; 808 halls fall. Ask: "Shall 909 glass jars flash?" Glad jazz; 111 flags last. "Flash 222 halls fast!" ask 333 lads. Lasses dash; 444 glass jars fall. "Ask 555 dads," lads say, "shall 666 flags last?" Glad halls; 777 jazz lasses flash. "Shall 888 glass halls last 999 days?" ask dads.',
    difficulty: 'advanced' as const,
    keyboardRow: 'home' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },

  // Advanced - Upper Row - No Numbers - With Special Chars
  {
    title: 'Upper Row Professional Punctuation',
    content: 'Write proper reports; type requirements with priority. "Poetry protects territory!" you say. Try to put reports out; write pretty poetry. "Proper requirements," we type, "protect equity opportunities." Write: "Poetry requires quiet power." Type reports; put territory opportunities out. "Try pretty poetry," you write, "with proper power." Reports require priority; write quiet poetry. "Put opportunities out!" we type. Try to write: "Poetry protects territory equity." Type proper reports; write pretty requirements. "Quiet power," you say, "protects opportunities." Write poetry; type proper territory reports. "Requirements protect equity!" we write. Try poetry; put proper reports out. "Write pretty words," you type, "with quiet power." Reports protect; poetry requires territory. "Put equity out!" we write.',
    difficulty: 'advanced' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },

  // Advanced - Upper Row - With Numbers - With Special Chars
  {
    title: 'Upper Row Technical Documentation',
    content: 'Write 25 reports; type 30 requirements with priority. "Poetry: 45 pieces!" you write. Try to put 67 reports out; write 89 pretty poems. "Proper requirements," we type, "protect 101 equity opportunities." Write: "Poetry requires 202 quiet power units." Type 303 reports; put 404 territory opportunities out. "Try 505 pretty poetry pieces," you write, "with 606 proper power." Reports require 707 priority; write 808 quiet poems. "Put 909 opportunities out!" we type. Try to write: "Poetry protects 111 territory equity." Type 222 proper reports; write 333 pretty requirements. "Quiet 444 power," you say, "protects 555 opportunities." Write 666 poetry; type 777 proper territory reports. "Requirements 888 protect equity!" we write. Try 999 poetry; put proper reports out.',
    difficulty: 'advanced' as const,
    keyboardRow: 'upper' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },

  // Advanced - Lower Row - No Numbers - With Special Chars
  {
    title: 'Lower Row Symbol Integration',
    content: 'Box examples; mix cabbage carefully. "Zoom cameras?" van drivers ask. Can ban mixing! Examine cabbage boxing; mix with care. "Van cameras," they say, "zoom in." Box cabbage; examine mixing procedures. "Can ban boxing?" drivers ask. Zoom! Mix cabbage; examine boxes. "Van mixing," they note, "requires care." Box examples; zoom cameras in. "Can examine cabbage?" drivers ask. Mix boxing; ban unsafe procedures. "Zoom in!" they say. Van cabbage; box with care. "Examine mixing?" cameras zoom. Box procedures; mix cabbage safely. "Van boxing," they ask, "can ban?" Zoom cameras; mix cabbage boxes. "Can van drivers," they note, "examine boxing?" Mix procedures; ban unsafe cabbage. "Box cameras!" they say.',
    difficulty: 'advanced' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },

  // Advanced - Lower Row - With Numbers - With Special Chars
  {
    title: 'Lower Row Advanced Operations',
    content: 'Box 15 examples; mix 27 items carefully. "Zoom 38 cameras?" van drivers ask. Can ban 49 mixing! Examine 56 cabbage boxes; mix with care. "Van 67 cameras," they say, "zoom in 78." Box 89 cabbage; examine 101 mixing procedures. "Can ban 202 boxing?" drivers ask. Zoom! Mix 303 cabbage; examine 404 boxes. "Van 505 mixing," they note, "requires 606 care." Box 707 examples; zoom 808 cameras in. "Can examine 909 cabbage?" drivers ask. Mix 111 boxing; ban 222 unsafe procedures. "Zoom 333 in!" they say. Van 444 cabbage; box with 555 care. "Examine 666 mixing?" cameras zoom. Box 777 procedures; mix 888 cabbage safely. "Van 999 boxing," they ask, "can ban?" Zoom cameras; mix cabbage boxes.',
    difficulty: 'advanced' as const,
    keyboardRow: 'lower' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },

  // Advanced - All Rows - No Numbers - With Special Chars
  {
    title: 'Professional Email with Formatting',
    content: 'Dear Mr. Smith, I hope you\'re well today. Please review the attached document & provide feedback. "The quarterly report," as mentioned, "requires immediate attention." We\'ve made significant progress; however, challenges remain. Could you clarify the requirements? I\'d appreciate your input on: budget allocation, timeline adjustments, and resource planning. The team\'s dedication is commendable! Please let me know if you have questions. We\'ll schedule a meeting next week to discuss findings & recommendations. Thank you for your continued support; it\'s invaluable to our success. Best regards, John. P.S. The deadline is approaching fast! Looking forward to your response & collaboration on this important project.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },
  {
    title: 'Creative Writing with Dialogue',
    content: 'The storm raged on; lightning flashed across the darkening sky! "We must find shelter," she whispered urgently. Time was running out... The wind howled through the trees, bending them like dancers. "This way!" he shouted over the thunder. Rain pelted their faces as they ran. "There\'s a cabin ahead," she pointed. The old wooden structure creaked ominously. "Will it hold?" he wondered aloud. Inside, they caught their breath. "That was close," she sighed with relief. The storm continued its fury outside; they were safe for now. "Tomorrow we\'ll continue our journey," he promised. She nodded, grateful for the temporary refuge. "What lies ahead?" she asked. "Adventure," he smiled, "and perhaps danger too." The night stretched before them, full of uncertainty & hope.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },
  {
    title: 'Technical API Documentation',
    content: 'Configure the API endpoint: /users/{id}/profile for user management. Use GET method with authentication headers & proper error handling. The response format includes: {"user": {"name": "John", "email": "john@example.com"}}. Handle errors gracefully; return appropriate status codes. POST requests require: Content-Type: application/json header. Authentication uses Bearer tokens; include in Authorization header. Rate limiting applies: 100 requests/minute per user. Error responses follow format: {"error": "message", "code": 400}. Documentation available at: /api/docs endpoint. Support contact: api-support@company.com for assistance. Remember to validate input data & sanitize user content. Use HTTPS for secure communication; never expose sensitive information in URLs or logs.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: false,
    includesSpecialChars: true,
  },

  // Advanced - All Rows - With Numbers - With Special Chars
  {
    title: 'Programming Code Examples',
    content: 'const user = { name: "John", age: 30, email: "john@example.com" }; if (user.age >= 18) { console.log("Adult user"); } else { console.log("Minor user"); } function calculateTax(income) { return income * 0.25; } const users = [1, 2, 3].map(id => ({ id, active: true })); try { const response = await fetch("/api/users"); const data = await response.json(); } catch (error) { console.error("Failed:", error.message); } const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/; if (regex.test(email)) { console.log("Valid email"); } const config = { timeout: 5000, retries: 3, baseURL: "https://api.example.com" }; async function processData(items) { return items.filter(item => item.status === "active").map(item => ({ ...item, processed: true })); }',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Web Development API Calls',
    content: 'Visit https://api.example.com/v1/users?page=2&limit=50 for user data. Use POST /auth/login with {"email": "user@domain.com", "password": "secret123"}. Headers: {"Content-Type": "application/json", "Authorization": "Bearer abc123xyz"}. Response: {"success": true, "token": "jwt.token.here", "expires": 3600}. Error handling: if (response.status !== 200) { throw new Error(`HTTP ${response.status}`); } Rate limits: 1000 requests/hour per API key. Pagination: ?page=1&limit=25&sort=created_at&order=desc. WebSocket: wss://api.example.com/ws?token=abc123 for real-time updates. GraphQL endpoint: POST /graphql with query: { users(first: 10) { id name email } }. REST alternatives: GET /users/{id}, PUT /users/{id}, DELETE /users/{id}.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Database Query Operations',
    content: 'SELECT u.name, u.email, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at >= "2024-01-01" AND u.status = "active" GROUP BY u.id HAVING COUNT(o.id) > 5 ORDER BY order_count DESC LIMIT 100; UPDATE users SET last_login = NOW() WHERE id = 123; INSERT INTO orders (user_id, total, status) VALUES (456, 99.99, "pending"); DELETE FROM sessions WHERE expires_at < NOW(); CREATE INDEX idx_user_email ON users(email); ALTER TABLE users ADD COLUMN phone VARCHAR(20); EXPLAIN SELECT * FROM users WHERE email = "test@example.com"; SHOW TABLES; DESCRIBE users; DROP INDEX idx_old_column ON users; BACKUP DATABASE mydb TO "/backup/mydb_20241201.sql";',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'System Administration Commands',
    content: 'Run: sudo apt-get update && apt-get install -y nodejs npm git. Check status: systemctl status nginx && systemctl status mysql. Log monitoring: tail -f /var/log/nginx/access.log | grep "ERROR". Process management: ps aux | grep node && kill -9 1234. File permissions: chmod 755 /usr/local/bin/script.sh && chown www-data:www-data /var/www. Network: netstat -tulpn | grep :80 && iptables -L. Backup: tar -czf backup_$(date +%Y%m%d).tar.gz /home/user/. Cron job: 0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1. Docker: docker run -d --name myapp -p 3000:3000 myapp:latest. SSH: ssh -i ~/.ssh/id_rsa user@server.com "ls -la /var/www". Firewall: ufw allow 22/tcp && ufw enable.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Financial Analysis Report',
    content: 'Q3 2024 Financial Summary: Revenue $2.3M (+15.7% YoY). Operating expenses: $1.8M (-5.2% vs Q2). Net profit: $500K (21.7% margin). Key metrics: EBITDA $650K, ROI 27.8%, customer acquisition cost $45/user. Growth drivers: 1) New product launch (+$300K revenue), 2) Marketing campaign @SocialMedia (+25% leads), 3) Partnership with Tech&Co (+$150K). Challenges: supply chain costs (+8%), employee retention (12% turnover). Outlook: Q4 target $2.8M revenue. Contact: cfo@company.com for detailed analysis. Board meeting: Dec 15th @ 2:00 PM. KPIs: LTV/CAC ratio 3.2:1, churn rate 5.5%, MRR growth 18%. Budget allocation: R&D 35%, Sales 25%, Marketing 20%, Operations 20%. Risk factors: market volatility, regulatory changes, competitive pressure.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Configuration File Management',
    content: '{"server": {"port": 3000, "host": "0.0.0.0", "ssl": true}, "database": {"url": "mysql://user:pass@localhost:3306/db", "pool": {"min": 2, "max": 10}}, "redis": {"host": "127.0.0.1", "port": 6379, "password": "secret123"}, "logging": {"level": "info", "file": "/var/log/app.log"}, "features": {"auth": true, "cache": true, "debug": false}, "limits": {"requests": 1000, "upload": "10MB", "timeout": 30000}, "email": {"smtp": "smtp.gmail.com:587", "user": "app@company.com"}, "monitoring": {"enabled": true, "endpoint": "https://monitor.example.com/webhook", "interval": 60}, "security": {"cors": ["https://app.example.com"], "rateLimit": {"window": 900000, "max": 100}}}',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Regular Expression Patterns',
    content: 'Email validation: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/ Phone US format: /^\\+?1?[-.\\s]?\\(?[0-9]{3}\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}$/ URL pattern: /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/ Password strength: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/ Credit card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/ Date format: /^\\d{4}-\\d{2}-\\d{2}$/ IPv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ MAC address: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Git Version Control Commands',
    content: 'git commit -m "feat: add user authentication system (closes #123)" && git push origin feature/auth-system --force-with-lease. Branch management: git checkout -b feature/new-api && git merge develop --no-ff. Stash operations: git stash push -m "WIP: refactoring auth" && git stash pop. Remote handling: git remote add upstream https://github.com/original/repo.git && git fetch upstream. Rebase workflow: git rebase -i HEAD~3 && git push --force-with-lease. Tag creation: git tag -a v1.2.3 -m "Release version 1.2.3" && git push origin v1.2.3. Log analysis: git log --oneline --graph --since="2024-01-01". Conflict resolution: git mergetool && git commit. Submodules: git submodule add https://github.com/user/repo.git libs/repo. Cherry-pick: git cherry-pick abc123def456.',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
  {
    title: 'Markdown Documentation Format',
    content: '# API Reference Guide\\n\\n## Authentication\\n\\n### POST /auth/login\\n\\n```bash\\ncurl -X POST https://api.example.com/auth \\\\\\n  -H "Content-Type: application/json" \\\\\\n  -d \'{"email": "user@example.com", "password": "secret123"}\'\\n```\\n\\n**Response:**\\n\\n```json\\n{\\n  "token": "eyJhbGciOiJIUzI1NiIs...",\\n  "expires": 3600,\\n  "user": {\\n    "id": 123,\\n    "name": "John Doe"\\n  }\\n}\\n```\\n\\n> **Note:** Tokens expire after 1 hour (3600 seconds).\\n\\n- [x] Authentication\\n- [ ] Rate limiting\\n- [ ] Error handling\\n\\n### Error Codes\\n\\n| Code | Description |\\n|------|-------------|\\n| 400  | Bad Request |\\n| 401  | Unauthorized |\\n| 403  | Forbidden |\\n| 404  | Not Found |',
    difficulty: 'advanced' as const,
    keyboardRow: 'all' as const,
    includesNumbers: true,
    includesSpecialChars: true,
  },
];

async function main() {
  console.log('🌱 Starting comprehensive sample text seeding with 100-150 words per combination...');
  
  // Clear existing sample texts
  await prisma.sampleText.deleteMany({});
  console.log('🗑️  Cleared existing sample texts');
  
  let createdCount = 0;
  
  for (const text of sampleTexts) {
    const characterCount = text.content.length;
    const wordCount = text.content.split(/\s+/).filter(word => word.length > 0).length;
    
    try {
      await prisma.sampleText.create({
        data: {
          ...text,
          characterCount,
          wordCount,
        },
      });
      
      createdCount++;
      console.log(`✅ Created: ${text.title} (${text.difficulty}/${text.keyboardRow}/${text.includesNumbers ? 'numbers' : 'no-numbers'}/${text.includesSpecialChars ? 'special' : 'no-special'}) - ${wordCount} words`);
    } catch (error) {
      console.error(`❌ Failed to create: ${text.title}`, error);
    }
  }
  
  console.log(`\\n🎉 Seeding completed! Created ${createdCount} sample texts.`);
  
  // Print summary
  const summary = await prisma.sampleText.groupBy({
    by: ['difficulty', 'keyboardRow', 'includesNumbers', 'includesSpecialChars'],
    _count: true,
  });
  
  console.log('\\n📊 Summary by combination:');
  summary.forEach(group => {
    console.log(`   ${group.difficulty}/${group.keyboardRow}/${group.includesNumbers ? 'numbers' : 'no-numbers'}/${group.includesSpecialChars ? 'special' : 'no-special'}: ${group._count} texts`);
  });
  
  // Print word count statistics
  const wordStats = await prisma.sampleText.aggregate({
    _avg: { wordCount: true },
    _min: { wordCount: true },
    _max: { wordCount: true },
  });
  
  console.log('\\n📈 Word count statistics:');
  console.log(`   Average: ${Math.round(wordStats._avg.wordCount || 0)} words`);
  console.log(`   Minimum: ${wordStats._min.wordCount || 0} words`);
  console.log(`   Maximum: ${wordStats._max.wordCount || 0} words`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });