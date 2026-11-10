/**
 * ORBIT CAROUSEL — Experiences Section
 * 3D elliptical orbit track, crystalline glass cards, inertia drag,
 * weight-bearing card flip, project detail deep-dive overlay.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════
     DATA
  ═══════════════════════════════════════ */
    const CATEGORIES = [
  {
    id: 'lecture-1',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
    title: 'Professional Skills',
    tagline: 'Values, Character & Employability',
    accent: '#818cf8',
    accentRgb: '129,140,248',
    accentSecondary: '#ec4899',
    sections: [
      {
        btn: 'What I Learned',
        content: `This lecture helped me understand that being good at a job is not only about having technical knowledge. Professional skills, also called soft or employability skills, are equally important because they help us communicate, work with others, solve problems, and handle different situations at work.

Some of the important professional skills I learned about are:

• Communication: expressing ideas clearly and listening to others.
• Teamwork: working with others and contributing towards a common goal.
• Problem-solving: understanding problems and finding suitable solutions.
• Adaptability: being able to adjust to changes and new situations.
• Time management: organizing tasks and completing them on time.
• Leadership: guiding and motivating others when working towards a goal.`
      },
      {
        btn: 'Values, Beliefs, Attitudes & Character',
        content: `I also learned how these four things influence the way we behave.

• Values: what I consider important, such as honesty, respect, and responsibility.
• Beliefs: what I believe to be true, such as believing that I can improve through practice.
• Attitudes: how I respond to people and situations based on my values and beliefs.
• Character: how these qualities are shown through my actions and behavior over time.`
      },
      {
        btn: 'Johari Window',
        images: ['src/johari-window.webp'],
        content: `One concept I found interesting was the Johari Window, which showed me the importance of self-awareness and feedback. Sometimes other people may notice things about us that we do not notice ourselves, so accepting feedback can help us improve.

The Johari Window is a 2x2 model with four quadrants:

• Open Area: Things known to both yourself and others — the foundation of productive professional relationships.
• Blind Spot: Things others can see about you, but you cannot see yourself — accepting feedback helps shrink this area.
• Hidden Area: Things you know about yourself but choose not to share with others — selective disclosure builds trust over time.
• Unknown: Things neither you nor others currently know about you — discovered through new experiences and challenges.

The key lesson is that by actively seeking feedback and being open to sharing more about ourselves, we can expand our Open Area and reduce blind spots — leading to greater self-awareness and better professional relationships.`
      },
      {
        btn: 'Group Activity',
        images: ['src/lecture1-group-activity.jpg', 'src/lecture1-group-craft.jpg'],
        content: `During Lecture 1, we participated in an interactive, hands-on group teamwork challenge where we collaborated in teams to design and build paper structures and crafts.

Key takeaways from the group activity:

• Teamwork & Collaboration: Working with peers toward a common objective, sharing ideas, and delegating responsibilities effectively.
• Communication & Active Listening: Expressing creative concepts clearly, listening to teammates' suggestions, and coordinating actions under time limits.
• Creative Problem Solving: Working within constraints, adapting when designs were structurally tested, and iterating together to achieve the final outcome.
• Leadership & Adaptability: Guiding progress, maintaining team motivation, and celebrating collective achievements.`
      },
      {
        btn: 'My Key Takeaway',
        content: `My main takeaway from this lecture is that technical skills alone are not enough to succeed professionally. I need to also develop how I communicate, work with others, manage my time, handle challenges, and respond to feedback.

I also learned that professional skills are not something we simply have or do not have. They can be developed through practice, experience, feedback, and continuous learning.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-2',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    title: 'Building a Portfolio',
    tagline: 'Proof of Work & Continuous Improvement',
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    accentSecondary: '#0891b2',
    sections: [
      {
        btn: 'What I Learned',
        content: `This lecture helped me understand what a professional portfolio is and why it can be more useful than simply having a CV. A portfolio is a collection of my projects, skills, achievements, and experiences that gives employers actual evidence of what I can do.

A CV mainly tells someone what I have done, while a portfolio can show them what I can do.

A good portfolio helps me:
• Show proof of my work through real projects.
• Highlight my skills and achievements.
• Create a visual identity and show my personality.
• Give employers evidence instead of just making claims.
• Help me present and pitch myself professionally.`
      },
      {
        btn: 'Building a Portfolio',
        content: `I learned that creating a portfolio can be divided into four main phases:

1. Define: Decide the purpose of the portfolio and identify the projects and skills I want to showcase.

2. Assemble: Collect my best projects, achievements, certificates, and other useful materials.

3. Polish: Improve the presentation and make sure my best work and achievements stand out.

4. Present & Update: Publish the portfolio, share it with the right audience, and keep updating it as I gain new experience.`
      },
      {
        btn: 'Portfolio as a Continuous Loop',
        content: `A portfolio is not something I create once and forget about. It is a continuous process:

Evaluate → Improve → Design → Ideate → Repeat

I can evaluate my strengths and weaknesses, improve my work, redesign how it is presented, and select better projects as I gain experience.`
      },
      {
        btn: 'My Key Takeaway',
        content: `My biggest takeaway from this lecture is that a portfolio is more than an online CV. It is a way of showing evidence of my abilities and creating a professional identity.

It also made me realize that my portfolio should keep evolving. As I complete better projects and develop new skills, I should replace weaker work and continuously improve how I present myself.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-3',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8"></path><path d="M8 13h6"></path></svg>`,
    title: 'Job Interview Skills',
    tagline: 'Preparation, STAR Method & Professional Conduct',
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    accentSecondary: '#d97706',
    sections: [
      {
        btn: 'Purpose & Preparation',
        content: `Purpose & Mutual Evaluation:
A job interview is a structured, two-way exchange of information where the employer evaluates candidate fit and the candidate assesses organizational alignment.

The First Step in Interview Preparation:
Thoroughly research the targeted company before the interview. Research provides critical context on company operations, culture, and key industry terminology, enabling candidates to tailor answers specifically to organizational needs.

Logistics & Professional Courtesy:
• Arrive shortly before the scheduled interview time.
• Bring extra printed copies of your CV/resume for unexpected interviewers or panel members.
• Greet interviewers by name, express genuine enthusiasm for the role, ask thoughtful questions regarding company operations, and inquire about the decision-making timeline before departing.`
      },
      {
        btn: 'Dressing, Grooming & Nonverbal',
        content: `Dressing, Grooming, and Visual Presentation:
• Attire: Choose formal business suits in conservative tones such as navy blue or charcoal gray. If dress codes are ambiguous, default to formal business attire.
• Grooming: Ensure hair is clean and neatly styled. Keep makeup natural and polished. Avoid heavy fragrances, flashy accessories, or unbrushed teeth.

Nonverbal Communication Dynamics (The 93% Rule):
55% of message delivery is driven by body language, while total nonverbal channels (body language + vocal tone) account for 93% of face-to-face communication.

• 55% Body Language: Visual cues including posture, eye contact, facial expressions, and natural hand gestures.
• 38% Tone of Voice: Vocal inflection, volume, clarity, and pacing.
• 7% Verbal Words: The actual spoken words used.

Key Nonverbal Behaviors:
Execute a firm handshake before and after the interview; maintain steady, positive eye contact; adopt an upright posture sitting firmly on the chair; use hands naturally for emphasis; smile warmly; avoid fidgeting or showing signs of nervousness.

Verbal Communication & Linguistic Precision:
• Speak clearly, calmly, and at a reasonable volume. Respond to questions promptly without rushing.
• Eliminate filler words and verbal ticks (such as "um" and "you know").
• Incorporate relevant industry terms and technical jargon naturally to demonstrate domain competence. Offer clear, simplified explanations if an interviewer expresses confusion over a complex technical term.`
      },
      {
        btn: 'The STAR Method',
        images: ['src/star-method.webp'],
        content: `Structured Answering Strategy: The STAR Method:
Use the STAR Method (Situation, Task, Action, Result) to structure responses to behavioral and past-experience questions:

• Situation: Define the specific context or background of the challenge. Fill in details of the specific event.
• Task: Explain the specific objective or problem that needed resolution. Explain your responsibility in that situation.
• Action: Detail the specific step-by-step actions you personally executed, highlighting leadership and initiative. Describe how you accomplished the task.
• Result: Quantify the positive outcome, achievements, and lessons learned. State the impact of your actions.

Pitfalls to Avoid:
Avoid rambling, going off-topic, or discussing results before explaining the actions taken.`
      },
      {
        btn: 'Addressing Weaknesses',
        content: `Addressing Weaknesses Constructively:
• Never claim to have no weaknesses, and do not select irrelevant weaknesses.
• State a genuine, job-related weakness paired with concrete steps currently being taken to overcome it, or frame a past area of growth constructively.
• Demonstrate self-awareness, honesty, and a real commitment to personal and professional development.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-4',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    title: 'CV Writing & ATS',
    tagline: 'Curriculum Vitae Writing & ATS Optimization',
    accent: '#38bdf8',
    accentRgb: '56,189,248',
    accentSecondary: '#0284c7',
    sections: [
      {
        btn: 'Definition & Formatting',
        content: `Definition & Objective:
A Curriculum Vitae (CV) is a comprehensive document detailing academic credentials, work history, skills, and achievements designed to secure job interviews.

Structural Layout & Formatting Standards:
• Length: Standard professional length is two pages.
• Formatting: Maintain a clean, visually appealing layout with consistent font choices, standardized font sizes, strategic bullet points, clear section headings, and balanced white space.`
      },
      {
        btn: 'Essential CV Components',
        content: `Essential CV Components:

1. Personal Information: Full legal name, professional phone number, email address, and location. Optional: LinkedIn profile or personal portfolio URL.
2. Professional Summary: A concise statement summarizing career trajectory, core competencies, and value proposition tailored to the job.
3. Work Experience: Organized in reverse chronological order (most recent position first). Include job title, company name, location, and employment dates. Describe accomplishments using strong action verbs and quantifiable impact metrics.
4. Education: Listed in reverse chronological order. Include degree(s), major(s), institution name, and graduation year. Omit elementary or middle school records.
5. Skills: Categorized breakdown of hard skills (technical, domain-specific) and soft skills (leadership, communication) with accurate proficiency levels.
6. Achievements & Recognitions: Relevant awards, professional certifications, or honors.`
      },
      {
        btn: 'ATS Customization & Pitfalls',
        content: `Customization & Automated Applicant Tracking Systems (ATS):
• Tailoring your CV to specific job descriptions is essential for passing automated Applicant Tracking Systems (ATS).
• Extract key terms from the job posting and embed them into your work experience and summary sections to demonstrate exact job alignment.

Pitfalls to Eliminate:
Proofread extensively to eliminate spelling and grammatical errors, remove outdated or irrelevant information, and avoid inconsistent bullet formatting or text bloat.`
      },
      {
        btn: 'CV',
        images: ['src/cv-page-1.png', 'src/cv-page-2.png'],
        content: `Curriculum Vitae (CV) — Mohammed Thabith`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-5',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    title: 'Speaking & Meetings',
    tagline: 'Speaking Skills, Meeting Management & Group Facilitation',
    accent: '#f43f5e',
    accentRgb: '244,63,94',
    accentSecondary: '#e11d48',
    sections: [
      {
        btn: 'Meeting Types & Speaking Skills',
        images: ['src/speaking-skills.png'],
        content: `Definition & Role of Meetings:
Meetings are structured workplace gatherings designed to exchange information, align teams, solve problems, and make collective decisions.

Types of Professional Meetings & Specific Objectives:
1. Project Progress / Status Meetings: Objective 1: Review milestone achievements against timelines; Objective 2: Identify and resolve project bottlenecks.
2. Strategic Planning Meetings: Objective 1: Define long-term organizational goals; Objective 2: Allocate resource budgets across departments.
3. Decision-Making / Problem-Solving Meetings: Objective 1: Analyze operational challenges; Objective 2: Select and approve actionable solution strategies.
4. Organizational / Facility Upgrade Meetings: Objective 1: Evaluate structural and operational improvements; Objective 2: Assign committee execution roles.

Key Speaking & Interpersonal Skills:
Listening skills, respect, brevity, confidence, friendliness, nonverbal communication, and empathy.`
      },
      {
        btn: '10-Point Preparation Checklist',
        content: `10-Point Meeting Preparation Checklist:
Before convening a meeting, leaders must systematically review:

1. What is the precise purpose of the meeting?
2. What is the desired outcome of the meeting?
3. Who strictly needs to attend?
4. What is the date and exact time of the meeting?
5. Where will the meeting be held (location / virtual platform)?
6. What technical facilities and equipment are required?
7. How long should the meeting take?
8. Is it a formal or informal gathering?
9. What working papers must be prepared in advance? (Invitation, Agenda, Minutes of Previous Meeting, Working Documents)
10. What potential disruptions or problems could occur?`
      },
      {
        btn: "Roles, Agenda & Do's / Don'ts",
        images: ['src/meeting-do-dont.png'],
        content: `5 Essential Meeting Roles & Responsibilities:
• Chairperson / Facilitator: Leads the meeting, enforces the agenda, manages time, ensures equal participation, and maintains focus.
• Secretary: Records attendance, takes official meeting minutes, tracks action items, and distributes notes post-meeting.
• Treasurer: Reports on budget status, tracks financial expenditures, and presents financial forecasts.
• Editor: Reviews, polishes, and verifies written documentation, reports, or proposals generated by the group.
• Participants / Members: Prepare by reading agenda materials, actively contribute ideas, respect time constraints, and execute assigned action items.

Structured 5-Item Meeting Agenda:
1. Opening & Welcome: Formal introduction and approval of previous minutes.
2. Project Progress Review: Detailed walkthrough of recent milestones.
3. Status Updates & Task Reports: Individual department updates.
4. Issue Troubleshooting & Risk Analysis: Collaborative problem-solving portion.
5. Action Items & Next Steps: Assignment of tasks, deadlines, and closing.

Meeting Do's and Don'ts:
• DO: Obey the ground rules, be positive, separate people from problems, keep to the topic being discussed, use clear simple language, allow others to finish, ask for clarification if you don't understand.
• DON'T: Monopolise the discussion, become emotional or too argumentative, make personal criticisms, digress, use long complicated sentences, interrupt too much, pretend that you understand.`
      },
      {
        btn: 'Facilitation & Evaluation',
        content: `Facilitation Strategies, Time Management, and Common Challenges:
• Active Engagement: Facilitators ensure full participation by directly soliciting input from quieter members, using open-ended questions, and preventing dominant individuals from monopolizing discussion.
• Time Management: Facilitators must allocate strict time blocks per agenda item. Poor time management leads to meeting drag, unaddressed critical decisions, participant fatigue, and schedule disruptions.
• Common Meeting Challenges: Uncooperative or disruptive participants, off-topic side conversations, lack of pre-meeting preparation, and failure to reach consensus.

Meeting Evaluation & Continuous Improvement:
Utilize post-meeting evaluation rubrics measuring: (1) Goal achievement on a 1–5 scale, (2) Equal opportunity for contribution (Yes/No), and (3) Qualitative feedback for future meeting optimization.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-6',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    title: 'Email Etiquette',
    tagline: 'Formal Email Writing, Formatting & Online Footprint',
    accent: '#a855f7',
    accentRgb: '168,85,247',
    accentSecondary: '#7c3aed',
    sections: [
      {
        btn: 'Anatomy of Formal Email',
        images: ['src/email-etiquette.png'],
        content: `Anatomy of a Professional Email:
1. To Field: Recipient's exact email address.
2. Subject Line: Short, specific summary of the email's main point. Use logical search keywords. Include applicant name only when applying for a position; mention referrers explicitly. Never write full sentences or greetings inside the subject line.
3. Formal Salutation/Greeting: Use "Dear + Recipient's Title + Last Name" (e.g., Dear Professor Gordon, Dear Dr. Smith, Dear Mr. Brown, Dear Ms. Green). "Good morning/afternoon" is acceptable. Never use "Hey" in formal contexts.
4. Body Paragraphs: State clear message intent, maintain structured spacing between paragraphs, and use full words instead of informal contractions or text abbreviations.
5. Formal Closing: Acceptable closings include Best, Kind regards, Regards, or Sincerely. Inappropriate closings include Love, Yours/Yours truly, or xoxo.
6. Professional Signature Block: Include full legal name, program/role, university/company, physical address, phone number, and professional email address.`
      },
      {
        btn: 'Formatting & Digital Footprint',
        content: `Formatting Rules & Digital Footprint Guidelines:
• Capitalization Rule: Do NOT write in ALL CAPITALS, as it conveys shouting and triggers negative emotional responses.
• Text vs. Professional Writing: Eliminate slang, text abbreviations (e.g., "gonna", "u"), exclamation marks, and informal contractions.
• Security & Confidentiality: Never transmit sensitive data via email, including Social Security numbers, bank details, credit card numbers, or medical records.
• The 24-Hour Cool-Off Rule: If writing while angry or upset, sleep on the draft for 24 hours before reviewing and sending.
• Acknowledgement & Acronyms: Take a closer look before sending, let people know their email has been received, and use acronyms sparingly.`
      },
      {
        btn: 'Tone Calibration',
        content: `Tone Calibration:
Reframe demanding statements into polite modal requests:

• Instead of: "I'd like you to look at it and give me feedback by Tuesday"
• Use: "I was wondering if you might have time to review this draft when convenient"

Always respect the recipient's schedule and maintain professional courtesy.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-7',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    title: 'Telephone Etiquette',
    tagline: 'Call Management & Customer Service Protocols',
    accent: '#fb923c',
    accentRgb: '251,146,60',
    accentSecondary: '#ea580c',
    sections: [
      {
        btn: '6-Second Rule & Protocols',
        images: ['src/phone-etiquette.png'],
        content: `The 6-Second Rule & First Impressions:
A caller forms their complete impression of an organization within the first 6 seconds of a call.

Foundational Telephone Etiquette Rules:
• Answer calls promptly (by the 3rd ring). Primary office lines should always be answered by a live person.
• Identify the department and yourself immediately (e.g., "Chemistry Department; this is Janeal").
• Position the mouthpiece 1 inch from your lips. Speak clearly with enthusiasm and a "smile in your voice".
• Address the caller by name throughout the conversation.
• Strict Prohibitions: Never eat, chew gum, or drink while on the phone. Never cover the receiver with your hand or lay an unmuted receiver on a desk.`
      },
      {
        btn: '5 Hold Rules & Transfers',
        content: `The 5 Rules for Putting a Caller on Hold:
1. Ask the caller for permission to place them on hold.
2. Wait for their explicit response before pressing the hold button.
3. Explain why they are being put on hold.
4. Provide a specific timeframe and check back every 30 to 45 seconds (maximum 60 seconds).
5. Thank the caller explicitly for holding upon returning.

Professional Phrase Substitutions:
Replace abrupt phrasing ("Hang on", "Who's calling?", "I can't help you") with courteous alternatives ("May I put you on hold?", "May I say who is calling please?", "Let me transfer you to the department that can assist").`
      },
      {
        btn: 'De-escalating Angry Callers & IVR',
        content: `Handling Angry Callers & Call Processing (IVR):
• De-escalation: Listen actively, show sincere empathy ("I'm sorry about that; tell me what happened"), remain calm, take detailed notes, and follow through on commitments.
• Automated Call Processing (IVR): Useful for 24/7 access to routine info, but must keep menus brief and always provide an option to reach a live representative.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-8',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`,
    title: 'Emotional Intelligence',
    tagline: 'EI/EQ, Neurobiology & Self-Regulation',
    accent: '#ec4899',
    accentRgb: '236,72,153',
    accentSecondary: '#db2777',
    sections: [
      {
        btn: 'EQ vs. IQ Comparison',
        content: `EQ vs. IQ Comparison:
• IQ (Intelligence Quotient): Measures cognitive and academic ability; established largely at birth; traditionally used to measure academic potential.
• EQ (Emotional Intelligence): Measures the capacity to recognize, understand, and manage emotions in oneself and others. EQ can be continuously enhanced throughout life and accounts for 58% of job performance success across all professional roles. 90% of top workplace performers exhibit high EI.`
      },
      {
        btn: 'Neurobiology & The 3 Brains',
        content: `Neurobiology of Emotion & The Brain:
• The 3 Brains Model: (1) Reptilian Complex (instinctive survival/reproduction), (2) Limbic System (mammalian emotional center), (3) Neocortex (human logic and abstract thought).
• Key Brain Structures in EI:
  • Limbic System: Includes the Thalamus ("entrance way"), Hypothalamus, Basal Ganglia, Hippocampus (memory), and Amygdala (the "security guard" / seat of emotional reactions).
  • Prefrontal Cortex: The "CEO of the brain", responsible for executive functioning—reasoning, decision-making, impulse control, planning, and goal setting.
• Synaptic Pruning & Myelination: Synaptic pruning eliminates redundant neural connections to optimize brain efficiency. Myelination coats neural pathways, increasing nerve impulse transmission speed by 100 times. Myelination continues until age 25.
• Teen vs. Adult Brain: Adolescents rely primarily on the Amygdala (fight-or-flight) to process emotional input, leading to reactive decisions, whereas adults process emotional input through the Prefrontal Cortex.`
      },
      {
        btn: 'Hard-Wired vs. Taught Emotions',
        content: `Hard-Wired vs. Taught Emotions:
• Hard-Wired (Universal) Emotions: Sadness, Joy, Disgust, Anger, Surprise, Fear (mapped by Paul Ekman).
• Taught (Social/Learned) Emotions: Humility, Forgiveness, Empathy, Optimism, Compassion, Sympathy, Patience, Gratitude, Shame, Pride.`
      },
      {
        btn: '4 Core Components of EQ',
        content: `The 4 Core Components of Emotional Intelligence:
1. Self-Awareness: Recognizing your own emotional states, triggers, and strengths.
2. Self-Management / Motivation: Regulating emotional impulses, maintaining composure under pressure, and directing emotional energy toward goals.
3. Social Awareness / Empathy: Understanding others' emotional states. Mirror neurons in the premotor cortex provide the neural basis for empathy by simulating observed actions.
4. Relationship Management / Social Skills: Managing interpersonal dynamics, resolving conflicts, and leveraging emotional contagion positively in team settings.`
      }
    ],
    projects: [],
  },
  {
    id: 'lecture-9',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
    title: 'Environmental Day Project',
    tagline: 'Root & Rise — Indoor Plant Giveaway',
    accent: '#10b981',
    accentRgb: '16,185,129',
    accentSecondary: '#059669',
    sections: [
      {
        btn: 'Project Overview',
        images: ['src/env-plants.jpg', 'src/env-quiz-app.png'],
        content: `"Root and Rise" was an indoor plant giveaway organized for the Professional Skills module in support of Environment Day. The initiative aimed to raise awareness about indoor gardening and encourage students and lecturers to bring more greenery into their daily spaces.

Our group visited each batch in person and ran a quiz on indoor plantation, covering plant care, watering, sunlight needs, and the benefits of indoor plants. The quiz was timed, so participants had to be both accurate and quick. The top three participants in each batch, those who answered correctly in the shortest time, received a free indoor plant as a reward.

We also held a special giveaway for the lecturers, using a spin wheel with five plant options: Dracaena, Money Plant, Sansevieria, Lucky Bamboo, and Cactus. Each lecturer spun the wheel and took home whichever plant it landed on, which added an element of fun and surprise.

Overall, the event combined learning, friendly competition, and appreciation, while promoting sustainability and environmental responsibility in our campus community.`
      },
      {
        btn: 'My Contribution',
        images: ['src/env-team-giveaway.jpg', 'src/env-lecturer-award.jpg'],
        content: `I actively supported my team throughout the planning and execution of the project:

• Planning & Ideation: Contributed ideas during the planning stage, particularly for the quiz format and the spin wheel activity for lecturers.
• Quiz Preparation: Helped formulate and review the indoor plant care quiz questions covering watering, sunlight, and general care requirements.
• Organization & Setup: Helped organize and care for the plants, prepared packaging materials, and set up the interactive spin wheel.
• In-Person Batch Visits: Assisted with visiting each student batch in person, coordinating participants, and conducting timed quiz sessions.
• Event Execution: Supported the successful coordination and completion of the lecturer giveaway and overall event operations.`
      },
      {
        btn: 'Budget & Expenses',
        content: `Root & Rise Project Budget & Cost Breakdown:

• Dracaena Plants: 5 Plants | Unit Price: Rs. 600 | Total: Rs. 3,000
• Money Plants: 5 Plants | Unit Price: Rs. 600 | Total: Rs. 3,000
• Lucky Bamboo Plants: 5 Plants | Unit Price: Rs. 600 | Total: Rs. 3,000
• Cactus Plants: 10 Plants | Unit Price: Rs. 700 | Total: Rs. 7,000
• Sandriyana Plants: 5 Plants | Unit Price: Rs. 600 | Total: Rs. 3,000
• Transport & Logistics: Safe plant delivery | Total: Rs. 3,500
• Posters: 9 Posters | Unit Price: Rs. 50 | Total: Rs. 450
• Domain & Hosting for Website: Online quiz platform | Total: Rs. 400
• Plant Sticks: 50 Sticks | Unit Price: Rs. 14 | Total: Rs. 700
• Packaging Bags: 40 Bags | Unit Price: Rs. 67.50 | Total: Rs. 2,700
• Custom Branding Stickers: 40 Stickers | Unit Price: Rs. 60 | Total: Rs. 2,400

Total Project Expense: Rs. 29,150`
      },
      {
        btn: 'Challenges & Reflection',
        content: `Challenges Faced:

• Batch Schedule Coordination: Each batch had different academic timetables. Finding time slots that suited both the student batches and our group members required careful planning, ongoing communication, and agility.
• Sourcing & Budgeting: Managing the budget while sourcing healthy, high-quality indoor plants at reasonable prices to ensure enough plants for all student winners and lecturers.
• Fair Quiz Judging: Deciding top-three winners fairly based on both accuracy and speed required a reliable tracking system and handling close finishes.
• Plant Logistics & Transport: Transporting delicate plants safely across campus and keeping them fresh until distribution required extra care.
• Time Constraints: Managing high-energy sessions within short lecture transition windows while maintaining active engagement.

Key Learning and Personal Reflection:

Through the Root and Rise project, I learned the importance of teamwork, planning, and communication when organizing an event. I improved my time management, decision-making, and public speaking skills while working with a limited budget and interacting with different students and lecturers.

Personally, this project helped me become more confident in taking responsibility and working with others. Seeing students enjoy the quiz and take their plants home made me feel that our effort was worthwhile. If I were to do this project again, I would plan earlier and prepare backup plans for unexpected situations. Overall, it was a valuable experience that helped me grow while spreading awareness about environmental care.`
      }
    ],
    projects: [],
  }
];

  /* ═══════════════════════════════════════
     ORBIT MATH
     Cards sit on an ellipse:
       x = A * sin(θ)   (horizontal)
       z = B * cos(θ)   (depth, B < A → wide flat ellipse)
     θ=0 → front-centre (largest)
     θ=π → back (smallest)
  ═══════════════════════════════════════ */
  const N = CATEGORIES.length;                // 4
  const ELLIPSE_A = 660;    // horizontal half-axis (px)
  const ELLIPSE_B = 170;    // depth half-axis (px)
  const CARD_W    = 300;
  const CARD_H    = 420;

  // Auto-rotation speed (radians per second, very slow)
  const AUTO_SPEED = 0.35;
  // Snap targets: multiples of (2π/N)
  const STEP = (2 * Math.PI) / N;

  /* ═══════════════════════════════════════
     STATE
  ═══════════════════════════════════════ */
  let orbitAngle  = 0;       // current rotation angle (radians)
  let targetAngle = 0;       // snap target
  let velocity    = 0;       // drag velocity (rad/s)
  let isDragging  = false;
  let dragStartX  = 0;
  let dragLastX   = 0;
  let dragLastT   = 0;
  let autoRotate  = true;
  let autoTimer   = null;
  let flippedIdx  = -1;      // which card index is currently flipped (-1 = none)
  let initialized = false;
  let rafId       = null;
  let lastTs      = 0;

  let stage, expHeader, detailOverlay;
  let cardWraps  = [];

  /* ═══════════════════════════════════════
     DOM BUILDING
  ═══════════════════════════════════════ */
  function buildCards() {
    stage = document.getElementById('skills-stage');
    if (!stage) return;
    stage.innerHTML = '';
    cardWraps = [];

    CATEGORIES.forEach((cat, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'orbit-card-wrap';
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-label', `${cat.title.replace('\n', ' ')} — click to explore`);
      wrap.dataset.index = i;

      // ── Front ──────────────────────────────────────────
      const front = document.createElement('div');
      front.className = 'orbit-card orbit-card--front';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'card-icon-wrap';
      iconWrap.style.background = `rgba(${cat.accentRgb},0.12)`;
      iconWrap.style.borderColor = `rgba(${cat.accentRgb},0.25)`;
      iconWrap.style.boxShadow   = `0 8px 28px rgba(${cat.accentRgb},0.18)`;
      iconWrap.innerHTML = cat.icon;

      const titleEl = document.createElement('div');
      titleEl.className = 'card-title';
      titleEl.innerHTML = cat.title.replace('\n', '<br>');

      const hint = document.createElement('div');
      hint.className = 'card-cta-hint';
      hint.style.borderColor = `rgba(${cat.accentRgb},0.3)`;
      hint.textContent = 'Tap to explore';

      const accentLine = document.createElement('div');
      accentLine.className = 'card-accent-line';
      accentLine.style.background = `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`;

      front.append(iconWrap, titleEl, hint, accentLine);

      // ── Back ───────────────────────────────────────────
      const back = document.createElement('div');
      back.className = 'orbit-card orbit-card--back';

      const backHeader = document.createElement('div');
      backHeader.className = 'card-back-header';

      const backIcon = document.createElement('span');
      backIcon.className = 'card-back-icon';
      backIcon.innerHTML = cat.icon;

      const backTitleWrap = document.createElement('div');
      const backTitle = document.createElement('div');
      backTitle.className = 'card-back-title';
      backTitle.innerHTML = cat.title.replace('\n', '<br>');
      const backSub = document.createElement('div');
      backSub.className = 'card-back-subtitle';
      backSub.textContent = cat.tagline;
      backTitleWrap.append(backTitle, backSub);
      backHeader.append(backIcon, backTitleWrap);

      // Section buttons that open a popup (Skills carousel)
      const sectionContainer = document.createElement('div');
      sectionContainer.className = 'skills-section-container';

      const btnRow = document.createElement('div');
      btnRow.className = 'skills-section-btns';

      (cat.sections || []).forEach((sec, sIdx) => {
        const btn = document.createElement('button');
        btn.className = 'skills-sec-btn';
        btn.textContent = sec.btn;
        btn.type = 'button';
        btn.style.setProperty('--card-accent', cat.accent);
        btn.style.setProperty('--card-accent-rgb', cat.accentRgb);
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openDetail(cat, sIdx);
        });
        btnRow.appendChild(btn);
      });

      sectionContainer.append(btnRow);
      back.append(backHeader, sectionContainer);
      wrap.append(front, back);

      // ── Click to flip ──────────────────────────────────
      wrap.addEventListener('click', () => onCardClick(i));
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCardClick(i); }
      });

      stage.appendChild(wrap);
      cardWraps.push(wrap);
    });

    // Dots
    const dotsEl = document.getElementById('skills-dots');
    if (dotsEl) {
      dotsEl.innerHTML = '';
      CATEGORIES.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'skills-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', `Go to ${CATEGORIES[i].title.replace('\n', ' ')}`);
        d.addEventListener('click', () => snapTo(i));
        dotsEl.appendChild(d);
      });
    }
  }

  /* ═══════════════════════════════════════
     ORBIT POSITIONING
  ═══════════════════════════════════════ */
  function getCardAngle(i) {
    return orbitAngle + i * STEP;
  }

  function positionCards() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate responsive ellipse dimensions
    let activeA = ELLIPSE_A;
    let activeB = ELLIPSE_B;
    let responsiveCardScale = 1.0;

    if (vw < 1200) {
      activeA = Math.min(ELLIPSE_A, Math.max(150, vw * 0.35));
      activeB = Math.max(60, ELLIPSE_B * (activeA / ELLIPSE_A));
    }
    if (vw < 768) {
      // Increase base scale on mobile to keep cards large
      responsiveCardScale = 1.0; 
      // Modify activeA to represent vertical radius
      activeA = 220; 
      activeB = 100;
    }

    cardWraps.forEach((wrap, i) => {
      const θ = getCardAngle(i);

      // Ellipse position
      let x = activeA * Math.sin(θ);
      let z = activeB * Math.cos(θ);

      // Depth-based scale & opacity
      // z ranges -B to +B; normalise to 0–1 (front=1, back=0)
      const depthNorm = (z + activeB) / (2 * activeB);      // 0=back, 1=front
      const scale     = (0.62 + depthNorm * 0.38) * responsiveCardScale;                 // 0.62 → 1.0
      const opacity   = 0.25 + depthNorm * 0.75;                 // 0.25 → 1.0
      const zIndex    = Math.round(depthNorm * 100);

      // Y sinks slightly as it goes to the sides (elliptical arc)
      let yOffset   = -Math.cos(θ) * 18;                       // subtle vertical drift
      let ry = Math.sin(θ) * 22;  // cards face inward on the orbit

      let tx = x;
      let ty = yOffset;
      let tz = z;

      // Make it vertical on mobile
      if (vw < 768) {
        tx = 0;                        // No horizontal spread
        ty = activeA * Math.sin(θ);    // Vertical spread instead
        tz = activeB * Math.cos(θ);
        ry = 0;                        // Flat rotation
      }

      wrap.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
      wrap.style.opacity   = opacity.toFixed(3);
      wrap.style.zIndex    = zIndex;

      // Flip transform is handled by front/back face transforms
      // When flipped, we rotate the whole wrap an extra 180° on Y
      if (flippedIdx === i) {
        // Remove the orbit positioning and bring it to center for flip
        // Actually we keep position but apply flip via face transforms
        applyFlip(wrap, true);
      } else {
        applyFlip(wrap, false);
      }

      // Enable pointer events on all cards so they can be clicked to bring them to the front
      wrap.style.pointerEvents = 'auto';
    });

    // Update dots
    const frontIdx = getFrontIndex();
    document.querySelectorAll('.skills-dot').forEach((d, i) => {
      d.classList.toggle('active', i === frontIdx);
    });

    // Update SVG track ellipse to align perfectly with card positions
    const trackEllipse = document.querySelector('.orbit-track-svg ellipse');
    if (trackEllipse) {
      const rx = Math.min(570, (activeA / vw) * 1200);
      const ry = Math.min(55, rx * (activeB / activeA) * 0.25);
      trackEllipse.setAttribute('rx', rx.toFixed(1));
      trackEllipse.setAttribute('ry', ry.toFixed(1));
    }

  }

  function applyFlip(wrap, flipped) {
    const front = wrap.querySelector('.orbit-card--front');
    const back  = wrap.querySelector('.orbit-card--back');
    if (!front || !back) return;
    const dur = '0.75s';
    const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
    front.style.transition = `transform ${dur} ${ease}`;
    back.style.transition  = `transform ${dur} ${ease}`;
    if (flipped) {
      front.style.transform = 'rotateY(-180deg)';
      back.style.transform  = 'rotateY(0deg)';
      wrap.classList.add('is-flipped');
    } else {
      front.style.transform = 'rotateY(0deg)';
      back.style.transform  = 'rotateY(180deg)';
      wrap.classList.remove('is-flipped');
    }
  }

  function getFrontIndex() {
    // The card at angle closest to θ=0 (or multiples of 2π) after accounting for orbitAngle
    let bestIdx = 0;
    let bestCos = -Infinity;
    cardWraps.forEach((_, i) => {
      const θ = getCardAngle(i);
      const c = Math.cos(θ);  // cos=1 at front (θ=0), cos=-1 at back
      if (c > bestCos) { bestCos = c; bestIdx = i; }
    });
    return bestIdx;
  }

  /* ═══════════════════════════════════════
     CARD FLIP
  ═══════════════════════════════════════ */
  function onCardClick(i) {
    const frontIdx = getFrontIndex();

    // If not the front card, rotate to bring it front
    if (i !== frontIdx) {
      const diff = i - frontIdx;
      const steps = ((diff % N) + N) % N;
      // pick shorter direction
      const stepsForward  = steps;
      const stepsBackward = N - steps;
      if (stepsForward <= stepsBackward) {
        targetAngle -= stepsForward * STEP;
      } else {
        targetAngle += stepsBackward * STEP;
      }
      autoRotate = false;
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => { autoRotate = true; }, 5000);
      return;
    }

    // It's the front card — toggle flip
    if (flippedIdx === i) {
      // Unflip
      flippedIdx = -1;
      autoRotate = true;
      expHeader && expHeader.classList.remove('dim');
    } else {
      // Flip
      flippedIdx = i;
      autoRotate = false;
      clearTimeout(autoTimer);
      expHeader && expHeader.classList.add('dim');
    }
    positionCards();
  }

  function unflipAll() {
    flippedIdx = -1;
    autoRotate = true;
    expHeader && expHeader.classList.remove('dim');
    positionCards();
  }

  /* ═══════════════════════════════════════
     SNAP
  ═══════════════════════════════════════ */
  function snapTo(catIdx) {
    // We want card[catIdx] to be at front (θ=0)
    // getCardAngle(i) = orbitAngle + i * STEP
    // We want: orbitAngle + catIdx * STEP ≡ 0 (mod 2π)
    // → orbitAngle = -catIdx * STEP
    const desired = -catIdx * STEP;
    // Normalise to take the shortest path (handling JavaScript negative remainder behavior)
    let diff = desired - targetAngle;
    diff = (((diff + Math.PI) % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI)) - Math.PI;
    targetAngle += diff;
    velocity = 0;
    autoRotate = false;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => { autoRotate = true; }, 5000);
    unflipAll();
  }

  /* ═══════════════════════════════════════
     DRAG / INERTIA
  ═══════════════════════════════════════ */
  function onPointerDown(e) {
    if (e.target.closest('.proj-detail-overlay')) return;
    if (e.target.closest('.orbit-card--back'))    return; // let back card scroll
    isDragging  = true;
    dragStartX  = (e.touches ? e.touches[0] : e).clientX;
    dragLastX   = dragStartX;
    if (e.touches) {
       window.dragLastY = e.touches[0].clientY;
    } else {
       window.dragLastY = e.clientY;
    }
    dragLastT   = performance.now();
    velocity    = 0;
    autoRotate  = false;
    clearTimeout(autoTimer);
    if (flippedIdx !== -1) unflipAll();
    e.stopPropagation();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const cx = (e.touches ? e.touches[0] : e).clientX;
    const now = performance.now();
    const dt  = (now - dragLastT) / 1000 || 0.016;
    // Convert pixel delta to radians
    // If vertical on mobile, use dy instead of dx
    const vw = window.innerWidth;
    let dAngle = 0;
    
    if (vw < 768) {
      // vertical scroll uses y
      const cy = (e.touches ? e.touches[0] : e).clientY;
      if (typeof dragLastY === 'undefined') dragLastY = cy;
      const dy = cy - dragLastY;
      dAngle = (dy / 220) * -1.4;
      dragLastY = cy;
      dragLastX = cx; // keep sync
    } else {
      const dx  = cx - dragLastX;
      dAngle = (dx / ELLIPSE_A) * -1.4;
      dragLastX = cx;
    }
    orbitAngle  += dAngle;
    targetAngle  = orbitAngle;

    velocity    = dAngle / dt;  // rad/s

    dragLastX   = cx;
    dragLastT   = now;
    positionCards();
    e.preventDefault();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging  = false;

    // Snap to nearest card after inertia settles
    // We'll let the RAF handle deceleration, then snap
    autoTimer = setTimeout(() => {
      const frontIdx = getFrontIndex();
      snapTo(frontIdx);
      setTimeout(() => { autoRotate = true; }, 1000);
    }, 700);
  }

  /* ═══════════════════════════════════════
     ANIMATION LOOP
  ═══════════════════════════════════════ */
  let lastPositionUpdate = 0;
  const POSITION_UPDATE_INTERVAL = 16; // ~60fps

  function tick(ts) {
    const dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;

    if (isDragging) {
      // Nothing — handled in move
    } else {
      // Inertia decay
      if (Math.abs(velocity) > 0.001) {
        orbitAngle += velocity * dt;
        targetAngle = orbitAngle;
        velocity   *= Math.pow(0.88, dt * 60);
      } else {
        velocity = 0;
        // Spring to target
        const diff = targetAngle - orbitAngle;
        if (Math.abs(diff) > 0.0005) {
          orbitAngle += diff * Math.min(dt * 8, 1);
        } else {
          orbitAngle = targetAngle;
          // Auto-rotate when settled
          if (autoRotate && flippedIdx === -1) {
            orbitAngle  -= AUTO_SPEED * dt;
            targetAngle  = orbitAngle;
          }
        }
      }
    }

    // Throttle position updates for better performance
    if (ts - lastPositionUpdate >= POSITION_UPDATE_INTERVAL) {
      positionCards();
      lastPositionUpdate = ts;
    }

    rafId = requestAnimationFrame(tick);
  }

  /* ═══════════════════════════════════════
     PROJECT DETAIL OVERLAY
  ═══════════════════════════════════════ */
  function openDetail(cat, secIdx) {
    const overlay  = document.getElementById('skills-detail');
    const tagEl    = document.getElementById('skills-detail-tag');
    const titleEl  = document.getElementById('skills-detail-title');
    const descEl   = document.getElementById('skills-detail-desc');
    const navEl    = document.getElementById('skills-sidebar-nav');
    const mainEl   = document.getElementById('skills-modal-main');

    if (!overlay) return;

    const sections = cat.sections || [];

    // Apply accent CSS vars to the overlay shell
    const shell = overlay.querySelector('.skills-detail-shell');
    if (shell) {
      shell.style.setProperty('--card-accent', cat.accent);
      shell.style.setProperty('--card-accent-rgb', cat.accentRgb);
    }

    // ── Build sidebar nav buttons ─────────────────────────────────────────
    navEl.innerHTML = '';
    sections.forEach((sec, idx) => {
      const btn = document.createElement('button');
      btn.className = 'skills-nav-btn' + (idx === secIdx ? ' active' : '');
      btn.type = 'button';
      btn.innerHTML = `<span class="skills-nav-indicator" style="background:${cat.accent}"></span><span class="skills-nav-title">${sec.btn}</span>`;
      btn.addEventListener('click', () => selectSection(idx));
      navEl.appendChild(btn);
    });

    // ── Render one section ────────────────────────────────────────────────
    function selectSection(idx) {
      // Update active button
      Array.from(navEl.querySelectorAll('.skills-nav-btn')).forEach((b, i) => {
        b.classList.toggle('active', i === idx);
      });

      const sec = sections[idx];
      if (!sec) return;

      // Tag
      tagEl.textContent = sec.btn;
      tagEl.style.background = `rgba(${cat.accentRgb},0.12)`;
      tagEl.style.border     = `1px solid rgba(${cat.accentRgb},0.35)`;
      tagEl.style.color      = cat.accent;

      // Title (category title)
      titleEl.textContent = cat.title.replace('\n', ' ');

      // Content HTML from sec.content
      let raw = sec.content || '';

      // Convert bullet lines to <ul><li>
      raw = raw.replace(/(?:^|\n)((?:•[^\n]+\n?)+)/gm, (match, bullBlock) => {
        const items = bullBlock.split('\n').filter(l => l.trim().startsWith('•')).map(l => `<li>${l.replace(/^•\s*/, '')}</li>`).join('');
        return `\n<ul class="lecture-bullets">${items}</ul>\n`;
      });

      // Convert numbered list lines (1. 2. 3.)
      raw = raw.replace(/(?:^|\n)((?:\d+\.\s+[^\n]+\n?)+)/gm, (match, numBlock) => {
        const items = numBlock.split('\n').filter(l => /^\d+\./.test(l.trim())).map(l => `<li>${l.replace(/^\d+\.\s*/, '')}</li>`).join('');
        return `\n<ol class="lecture-ol">${items}</ol>\n`;
      });

      // Paragraphs
      let contentHtml = raw.split(/\n\n+/).map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<ul') || block.startsWith('<ol')) return block;
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
      }).filter(Boolean).join('');

      // ── Images ───────────────────────────────────────────────────────────
      let imgHtml = '';
      const imgs = sec.images || [];

      if (imgs.length) {
        const isCV = imgs.some(s => s.includes('cv-page') || s.includes('cv-screenshot'));

        if (isCV) {
          // Modern CV document viewer
          imgHtml = `
<div class="modern-cv-viewer">
  <div class="cv-viewer-toolbar">
    <div class="cv-toolbar-left">
      <span class="cv-status-dot" style="background:${cat.accent}"></span>
      <span class="cv-viewer-title">Curriculum Vitae</span>
      <span class="cv-viewer-pill">300 DPI · Vector Quality</span>
    </div>
    <div class="cv-toolbar-right">
      <a class="cv-open-link" href="${imgs[0]}" target="_blank" rel="noopener" style="color:${cat.accent}">Open Full Page ↗</a>
    </div>
  </div>
  <div class="cv-pages-stack">
    ${imgs.map((src, i) => `
    <div class="cv-page-card">
      <span class="cv-page-badge">Page ${i+1} of ${imgs.length}</span>
      <img src="${src}" alt="CV Page ${i+1}" class="cv-page-img" loading="lazy">
    </div>`).join('')}
  </div>
</div>`;
        } else if (imgs.length === 1) {
          // Single image: glassmorphism frame
          imgHtml = `
<div class="creative-showcase-single">
  <div class="creative-glass-frame" style="border-color:rgba(${cat.accentRgb},0.3);box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05) inset,0 0 40px rgba(${cat.accentRgb},0.08)">
    <div class="creative-frame-shine"></div>
    <img src="${imgs[0]}" alt="${sec.btn}" class="creative-showcase-img" loading="lazy">
  </div>
</div>`;
        } else {
          // Multi-image: creative photo grid
          imgHtml = `
<div class="creative-showcase-grid">
  ${imgs.map((src, i) => `
  <div class="creative-grid-card" style="border:1px solid rgba(${cat.accentRgb},0.2)">
    <div class="creative-card-inner">
      <img src="${src}" alt="${sec.btn} ${i+1}" class="creative-grid-img" loading="lazy">
      <div class="creative-card-glare"></div>
    </div>
  </div>`).join('')}
</div>`;
        }
      }

      // For CV section: image first, no content text below
      const isCV2 = imgs.length && imgs.some(s => s.includes('cv-page'));
      descEl.innerHTML = isCV2 ? imgHtml : (imgHtml + contentHtml);

      // Scroll main to top
      if (mainEl) mainEl.scrollTop = 0;
    }

    // ── Show overlay ──────────────────────────────────────────────────────
    overlay.setAttribute('aria-hidden', 'false');
    overlay.scrollTop = 0;
    if (mainEl) mainEl.scrollTop = 0;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('open'));

    // Render the initially-requested section
    selectSection(typeof secIdx === 'number' ? secIdx : 0);
  }

  function closeDetail() {
    const overlay = document.getElementById('skills-detail');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const inner = overlay.querySelector('.proj-detail-inner');
    if (inner) inner.scrollTop = 0;
    overlay.scrollTop = 0;
    // Pause any video
    const vid = overlay.querySelector('video');
    if (vid) vid.pause();
  }

  function buildStarfield() {
    const starfield = document.getElementById('exp-starfield');
    if (!starfield) return;
    starfield.innerHTML = '';
    const numStars = 45;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'exp-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--d', `${2 + Math.random() * 4}s`);
      star.style.animationDelay = `${Math.random() * 5}s`;
      starfield.appendChild(star);
    }
  }

  /* ═══════════════════════════════════════
     PUBLIC API
  ═══════════════════════════════════════ */
  function start() {
    if (initialized) return;
    initialized = true;

    expHeader = document.getElementById('exp-header');
    detailOverlay = document.getElementById('skills-detail');

    buildCards();
    buildStarfield();
    positionCards();

    // Nav arrows
    const prevBtn = document.getElementById('skills-prev');
    const nextBtn = document.getElementById('skills-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { snapTo((getFrontIndex() + 1) % N); });
    if (nextBtn) nextBtn.addEventListener('click', () => { snapTo((getFrontIndex() - 1 + N) % N); });

    // Detail close
    const closeBtn = document.getElementById('skills-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);

    // Drag on stage
    const scene = document.getElementById('skills-scene');
    if (scene) {
      scene.addEventListener('mousedown',  onPointerDown, { passive: true });
      scene.addEventListener('touchstart', onPointerDown, { passive: true });
    }
    window.addEventListener('mousemove',  onPointerMove, { passive: false });
    window.addEventListener('touchmove',  onPointerMove, { passive: false });
    window.addEventListener('mouseup',    onPointerUp,   { passive: true });
    window.addEventListener('touchend',   onPointerUp,   { passive: true });

    // Keyboard navigation on stage
    const expPage = document.getElementById('page-experiences');
    if (expPage) {
      expPage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') snapTo((getFrontIndex() - 1 + N) % N);
        if (e.key === 'ArrowLeft')  snapTo((getFrontIndex() + 1) % N);
        if (e.key === 'Escape')     { closeDetail(); unflipAll(); }
      });
    }

    // Window resize
    window.addEventListener('resize', positionCards);

    lastTs = performance.now();
    rafId  = requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup',   onPointerUp);
    window.removeEventListener('touchend',  onPointerUp);
    window.removeEventListener('resize',    positionCards);
    initialized = false;
    orbitAngle  = 0;
    targetAngle = 0;
    velocity    = 0;
    flippedIdx  = -1;
    autoRotate  = true;
    clearTimeout(autoTimer);
    closeDetail();
  }

  window.SkillsCarousel = { start, stop };

})();
