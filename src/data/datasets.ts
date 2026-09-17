import { QuizDataset, Question } from '../types';

export const shuffleQuestionOptions = <T extends Omit<Question, 'id'> | Question>(q: T): T => {
  const correctAnswerText = q.answer || q.options[q.answerIndex] || q.options[0];
  const options = [...q.options];

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const answerIndex = options.indexOf(correctAnswerText);

  return {
    ...q,
    options,
    answerIndex: answerIndex >= 0 ? answerIndex : 0,
    answer: correctAnswerText
  };
};

export const testDataset: QuizDataset = {
  id: 'test-10',
  title: 'Scholarly Theology Test (10 Qs)',
  description: 'An advanced 10-question rigorous theological dataset to test the quiz engine.',
  category: 'Advanced Mixed',
  questions: ([
    {
      id: 1,
      question: 'Which king of Judah smashed the bronze serpent Nehushtan because the Israelites were offering incense to it?',
      options: ['Hezekiah', 'Josiah', 'Asa', 'Jehoshaphat'],
      answerIndex: 0,
      answer: 'Hezekiah',
      reference: '2 Kings 18:4',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Hezekiah removed the high places, broke the pillars, cut down the Asherah, and broke in pieces the bronze serpent that Moses had made.'
    },
    {
      id: 2,
      question: 'In Galatians 4, what mountain in Arabia does Paul use as an allegorical counterpart to the present Jerusalem?',
      options: ['Mount Sinai', 'Mount Horeb', 'Mount Seir', 'Mount Paran'],
      answerIndex: 0,
      answer: 'Mount Sinai',
      reference: 'Galatians 4:25',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'Paul uses Hagar to represent Mount Sinai in Arabia, corresponding to the present Jerusalem, which is in slavery with her children.'
    },
    {
      id: 3,
      question: 'What was the Aramaic name given to the potter’s field purchased with Judas’s returned betrayal money?',
      options: ['Akeldama', 'Golgatha', 'Gabbatha', 'Aceldama'],
      answerIndex: 0,
      answer: 'Akeldama',
      reference: 'Acts 1:19',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'It became known to all the inhabitants of Jerusalem as Akeldama, that is, Field of Blood.'
    },
    {
      id: 4,
      question: 'According to Leviticus 11, which of the following animals was classified as chewing the cud but lacking divided hooves?',
      options: ['Camel', 'Pig', 'Rabbit', 'Badger'],
      answerIndex: 0,
      answer: 'Camel',
      reference: 'Leviticus 11:4',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'The camel chews the cud but does not divide the hoof; it is unclean to you.'
    },
    {
      id: 5,
      question: 'What was the height in cubits of the golden image set up by Nebuchadnezzar in the plain of Dura?',
      options: ['60 cubits', '30 cubits', '100 cubits', '50 cubits'],
      answerIndex: 0,
      answer: '60 cubits',
      reference: 'Daniel 3:1',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'King Nebuchadnezzar made an image of gold, whose height was sixty cubits and its breadth six cubits.'
    },
    {
      id: 6,
      question: 'Which minor prophet pronounces woes upon Nineveh, describing it as a city of bloodshed full of lies and plunder?',
      options: ['Nahum', 'Habakkuk', 'Zephaniah', 'Obadiah'],
      answerIndex: 0,
      answer: 'Nahum',
      reference: 'Nahum 3:1',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Nahum pronounces judgment upon Nineveh, the bloody city, all full of lies and plunder.'
    },
    {
      id: 7,
      question: 'In Ezekiel 1, what are the four living creature faces representing divine sovereignty and creation?',
      options: ['Lion, Ox, Man, Eagle', 'Lion, Bear, Leopard, Eagle', 'Bull, Eagle, Man, Lion', 'Lion, Ox, Calf, Eagle'],
      answerIndex: 0,
      answer: 'Lion, Ox, Man, Eagle',
      reference: 'Ezekiel 1:10',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'As for the likeness of their faces: each had the face of a man, the face of a lion on the right side, the face of an ox on the left side, and the face of an eagle.'
    },
    {
      id: 8,
      question: 'In Paul’s defense before King Agrippa in Acts 26, what proverbial phrase did Jesus speak to him in Hebrew?',
      options: ['It is hard for you to kick against the goads', 'Saul, Saul, why do you persecute me', 'I am Jesus whom you are persecuting', 'Arise and go into the city'],
      answerIndex: 0,
      answer: 'It is hard for you to kick against the goads',
      reference: 'Acts 26:14',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'And when we had all fallen to the ground, I heard a voice saying to me in the Hebrew language, "Saul, Saul, why are you persecuting me? It is hard for you to kick against the goads."'
    },
    {
      id: 9,
      question: 'What was the name of the valley south of Jerusalem where child sacrifice to Molech took place, later symbolizing judgment?',
      options: ['Valley of Hinnom', 'Valley of Elah', 'Kidron Valley', 'Tyropoeon Valley'],
      answerIndex: 0,
      answer: 'Valley of Hinnom',
      reference: 'Jeremiah 19:2',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Go out to the Valley of the Son of Hinnom at the entry of the Potsgate.'
    },
    {
      id: 10,
      question: 'In the Book of Revelation, which church in Asia Minor is rebuked for being neither cold nor hot?',
      options: ['Laodicea', 'Sardis', 'Philadelphia', 'Thyatira'],
      answerIndex: 0,
      answer: 'Laodicea',
      reference: 'Revelation 3:15-16',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'I know your works: you are neither cold nor hot. Would that you were either cold or hot!'
    }
  ] as Question[]).map(q => shuffleQuestionOptions(q))
};

// Generate comprehensive master 110 question dataset with advanced, rigorous, scholarly theological & historical questions
const generateMasterQuestions = (): Question[] => {
  const rawQuestions: Omit<Question, 'id'>[] = [
    // --- ADVANCED & HARD THEOLOGICAL / HISTORICAL QUESTIONS ---
    {
      question: 'Which king of Judah smashed the bronze serpent Nehushtan because the Israelites were offering incense to it?',
      options: ['Hezekiah', 'Josiah', 'Asa', 'Jehoshaphat'],
      answerIndex: 0,
      answer: 'Hezekiah',
      reference: '2 Kings 18:4',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Hezekiah removed the high places and broke in pieces the bronze serpent that Moses had made.'
    },
    {
      question: 'In Galatians 4, what mountain in Arabia does Paul use as an allegorical counterpart to the present Jerusalem?',
      options: ['Mount Sinai', 'Mount Horeb', 'Mount Seir', 'Mount Paran'],
      answerIndex: 0,
      answer: 'Mount Sinai',
      reference: 'Galatians 4:25',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'Now Hagar is Mount Sinai in Arabia; she corresponds to the present Jerusalem.'
    },
    {
      question: 'What was the Aramaic name given to the potter’s field purchased with Judas’s returned betrayal money?',
      options: ['Akeldama', 'Golgatha', 'Gabbatha', 'Aceldama'],
      answerIndex: 0,
      answer: 'Akeldama',
      reference: 'Acts 1:19',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'It became known to all the inhabitants of Jerusalem as Akeldama, that is, Field of Blood.'
    },
    {
      question: 'According to Leviticus 11, which animal chews the cud but lacks divided hooves, making it unclean?',
      options: ['Camel', 'Pig', 'Rabbit', 'Badger'],
      answerIndex: 0,
      answer: 'Camel',
      reference: 'Leviticus 11:4',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'The camel chews the cud but does not divide the hoof; it is unclean to you.'
    },
    {
      question: 'What was the height in cubits of the golden image set up by Nebuchadnezzar in the plain of Dura?',
      options: ['60 cubits', '30 cubits', '100 cubits', '50 cubits'],
      answerIndex: 0,
      answer: '60 cubits',
      reference: 'Daniel 3:1',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'King Nebuchadnezzar made an image of gold, whose height was sixty cubits and its breadth six cubits.'
    },
    {
      question: 'Which minor prophet pronounces woes upon Nineveh, describing it as a city of bloodshed full of lies?',
      options: ['Nahum', 'Habakkuk', 'Zephaniah', 'Obadiah'],
      answerIndex: 0,
      answer: 'Nahum',
      reference: 'Nahum 3:1',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Woe to the bloody city, all full of lies and plunder—no end to the prey!'
    },
    {
      question: 'In Ezekiel 1, what are the four living creature faces representing divine sovereignty and creation?',
      options: ['Lion, Ox, Man, Eagle', 'Lion, Bear, Leopard, Eagle', 'Bull, Eagle, Man, Lion', 'Lion, Ox, Calf, Eagle'],
      answerIndex: 0,
      answer: 'Lion, Ox, Man, Eagle',
      reference: 'Ezekiel 1:10',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Each had the face of a man, the face of a lion on the right side, the face of an ox on the left side, and the face of an eagle.'
    },
    {
      question: 'In Paul’s defense before King Agrippa in Acts 26, what proverbial phrase did Jesus speak to him in Hebrew?',
      options: ['It is hard for you to kick against the goads', 'Saul, Saul, why do you persecute me', 'I am Jesus whom you are persecuting', 'Arise and go into the city'],
      answerIndex: 0,
      answer: 'It is hard for you to kick against the goads',
      reference: 'Acts 26:14',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'Jesus said in Hebrew: "Saul, Saul, why are you persecuting me? It is hard for you to kick against the goads."'
    },
    {
      question: 'What was the name of the valley south of Jerusalem where child sacrifice to Molech took place, later symbolizing judgment?',
      options: ['Valley of Hinnom', 'Valley of Elah', 'Kidron Valley', 'Tyropoeon Valley'],
      answerIndex: 0,
      answer: 'Valley of Hinnom',
      reference: 'Jeremiah 19:2',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Go out to the Valley of the Son of Hinnom at the entry of the Potsgate.'
    },
    {
      question: 'In the Book of Revelation, which church in Asia Minor is rebuked for being neither cold nor hot?',
      options: ['Laodicea', 'Sardis', 'Philadelphia', 'Thyatira'],
      answerIndex: 0,
      answer: 'Laodicea',
      reference: 'Revelation 3:15-16',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'I know your works: you are neither cold nor hot. Would that you were either cold or hot!'
    },

    // Additional 100 rigorous scholarly questions
    {
      question: 'What was the name of Abraham’s later wife/concubine who bore him Zimran, Jokshan, and Midian?',
      options: ['Hagar', 'Keturah', 'Milcah', 'Rephidim'],
      answerIndex: 1,
      answer: 'Keturah',
      reference: 'Genesis 25:1',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Abraham took another wife, whose name was Keturah. She bore him Zimran, Jokshan, Medan, Midian, Ishbak, and Shuah.'
    },
    {
      question: 'Who was the king of Bashan defeated by Israel at Edrei, noted for his gigantic iron bed?',
      options: ['Sihon', 'Og', 'Agag', 'Balak'],
      answerIndex: 1,
      answer: 'Og',
      reference: 'Deuteronomy 3:11',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'For only Og the king of Bashan was left of the remnant of the Rephaim. Behold, his bed was a bed of iron.'
    },
    {
      question: 'In Revelation 8, what is the name of the fallen star that made a third of the waters bitter?',
      options: ['Abaddon', 'Wormwood', 'Lucifer', 'Belial'],
      answerIndex: 1,
      answer: 'Wormwood',
      reference: 'Revelation 8:10',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'A great star fell from heaven, blazing like a torch... The name of the star is Wormwood.'
    },
    {
      question: 'Who was Oholiab’s father, associated with him in crafting the tabernacle furnishings?',
      options: ['Ahisamach', 'Uri', 'Hur', 'Bezaleel'],
      answerIndex: 0,
      answer: 'Ahisamach',
      reference: 'Exodus 35:34',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'And he has inspired him to teach, both him and Oholiab the son of Ahisamach, of the tribe of Dan.'
    },
    {
      question: 'What was the annual weight of gold received by King Solomon in talents, excluding merchant revenue?',
      options: ['400 talents', '666 talents', '1000 talents', '500 talents'],
      answerIndex: 1,
      answer: '666 talents',
      reference: '1 Kings 10:14',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'The weight of gold that came to Solomon in one year was 666 talents of gold.'
    },
    {
      question: 'Which prophet confronted King David with the parable of the rich man and the ewe lamb?',
      options: ['Gad', 'Nathan', 'Iddo', 'Ahijah'],
      answerIndex: 1,
      answer: 'Nathan',
      reference: '2 Samuel 12:7',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Nathan said to David, "You are the man!" after telling the parable of the ewe lamb.'
    },
    {
      question: 'What was the name of the valley where Joshua commanded the sun and moon to stand still?',
      options: ['Valley of Elah', 'Valley of Aijalon', 'Valley of Gibeon', 'Valley of Siddim'],
      answerIndex: 1,
      answer: 'Valley of Aijalon',
      reference: 'Joshua 10:12',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Sun, stand still at Gibeon, and moon, in the Valley of Aijalon.'
    },
    {
      question: 'Who was the mother of King Hezekiah of Judah?',
      options: ['Athaliah', 'Abijah', 'Hamutal', 'Zibiah'],
      answerIndex: 1,
      answer: 'Abijah',
      reference: '2 Kings 18:2',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'He was twenty-five years old when he became king, and he reigned twenty-nine years in Jerusalem. His mother’s name was Abi the daughter of Zechariah (also called Abijah).'
    },
    {
      question: 'Which Levite clan was entrusted with the direct transport of the holiest tabernacle furnishings under Kohath?',
      options: ['Gershonites', 'Merarites', 'Kohathites', 'Korahites'],
      answerIndex: 2,
      answer: 'Kohathites',
      reference: 'Numbers 4:15',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'When Aaron and his sons have finished covering the sanctuary and all the furnishings of the sanctuary, after that the sons of Kohath shall come to carry these.'
    },
    {
      question: 'What was the name of the Egyptian city where Jeremiah and the remnant Jews fled against God’s warning?',
      options: ['Memphis', 'Tahpanhes', 'Thebes', 'Migdol'],
      answerIndex: 1,
      answer: 'Tahpanhes',
      reference: 'Jeremiah 43:7',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'So they came into the land of Egypt, for they did not obey the voice of the Lord. And they arrived at Tahpanhes.'
    },
    {
      question: 'Who was the high priest who assisted child-king Joash in repairing the temple and covenant renewal?',
      options: ['Jehoiada', 'Uriah', 'Azariah', 'Hilchiah'],
      answerIndex: 0,
      answer: 'Jehoiada',
      reference: '2 Chronicles 24:6',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'The king summoned Jehoiada the chief priest and asked him, "Why have you not required the Levites to bring in from Judah and Jerusalem the tax assessed by Moses?"'
    },
    {
      question: 'What was the name of the Philistine idol in Ashdod that miraculously fell face down before the Ark?',
      options: ['Baal', 'Dagon', 'Ashtoreth', 'Milcom'],
      answerIndex: 1,
      answer: 'Dagon',
      reference: '1 Samuel 5:3',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'When the people of Ashdod rose early the next day, behold, Dagon had fallen face downward on the ground before the ark of the Lord.'
    },
    {
      question: 'Which prophet tore his new garment into twelve pieces to symbolize the division of Solomon’s kingdom?',
      options: ['Ahijah the Shilonite', 'Shemaiah', 'Jehu son of Hanani', 'Micaiah'],
      answerIndex: 0,
      answer: 'Ahijah the Shilonite',
      reference: '1 Kings 11:30',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Then Ahijah laid hold of the new garment that was on him, and tore it into twelve pieces.'
    },
    {
      question: 'What was the name of the brave woman who drove a tent peg through the temple of Sisera?',
      options: ['Deborah', 'Jael', 'Huldah', 'Abigail'],
      answerIndex: 1,
      answer: 'Jael',
      reference: 'Judges 4:21',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'But Jael the wife of Heber took a tent peg, and took a hammer in her hand, and went softly to him and drove the peg into his temple.'
    },
    {
      question: 'Which king of Judah was struck with leprosy for burning incense on the altar in the temple?',
      options: ['Uzziah', 'Jotham', 'Ahaz', 'Manasseh'],
      answerIndex: 0,
      answer: 'Uzziah',
      reference: '2 Chronicles 26:19',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Then Uzziah was angry. Now he had a censer in his hand to burn incense, and while he was angry with the priests, leprosy broke out on his forehead.'
    },
    {
      question: 'What was the name of the Syrian commander healed of leprosy by washing seven times in the Jordan?',
      options: ['Hazael', 'Naaman', 'Ben-Hadad', 'Rezin'],
      answerIndex: 1,
      answer: 'Naaman',
      reference: '2 Kings 5:14',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'So he went down and dipped himself seven times in the Jordan, according to the word of the man of God, and his flesh was restored like the flesh of a little child.'
    },
    {
      question: 'Who was the faithful scribe who wrote Jeremiah’s dictated prophecies on a scroll?',
      options: ['Baruch', 'Neriah', 'Seraiah', 'Gemariah'],
      answerIndex: 0,
      answer: 'Baruch',
      reference: 'Jeremiah 36:4',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'Then Jeremiah called Baruch the son of Neriah, and Baruch wrote on a scroll at the dictation of Jeremiah all the words of the Lord.'
    },
    {
      question: 'What was the name of the coastal port city from which Jonah boarded a ship fleeing to Tarshish?',
      options: ['Caesarea', 'Joppa', 'Tyre', 'Sidon'],
      answerIndex: 1,
      answer: 'Joppa',
      reference: 'Jonah 1:3',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'But Jonah rose to flee to Tarshish from the presence of the Lord. He went down to Joppa and found a ship going to Tarshish.'
    },
    {
      question: 'Who was the elderly prophetess who gave thanks to God and spoke about Jesus to all awaiting redemption in Jerusalem?',
      options: ['Anna', 'Elizabeth', 'Huldah', 'Deborah'],
      answerIndex: 0,
      answer: 'Anna',
      reference: 'Luke 2:36',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'And there was a prophetess, Anna, the daughter of Phanuel, of the tribe of Asher.'
    },
    {
      question: 'Which king of Judah had his life miraculously extended by 15 years in response to prayer?',
      options: ['Hezekiah', 'Josiah', 'Uzziah', 'Jotham'],
      answerIndex: 0,
      answer: 'Hezekiah',
      reference: '2 Kings 20:6',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'I will add fifteen years to your life. I will deliver you and this city out of the hand of the king of Assyria.'
    },
    {
      question: 'What was the name of Abraham’s chief servant from Damascus who sought a wife for Isaac?',
      options: ['Eliezer', 'Haran', 'Lot', 'Abimelech'],
      answerIndex: 0,
      answer: 'Eliezer',
      reference: 'Genesis 15:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'Abram said, "O Lord God, what will you give me, for I continue childless, and the heir of my house is Eliezer of Damascus?"'
    },
    {
      question: 'In whose house in Joppa did Peter stay when he had the vision of the sheet descending?',
      options: ['Simon the Tanner', 'Cornelius', 'Tabitha', 'Lydia'],
      answerIndex: 0,
      answer: 'Simon the Tanner',
      reference: 'Acts 9:43',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'And he stayed in Joppa for many days with one Simon a tanner.'
    },
    {
      question: 'Which minor prophet was a shepherd from Tekoa who preached against social injustice?',
      options: ['Amos', 'Joel', 'Obadiah', 'Habakkuk'],
      answerIndex: 0,
      answer: 'Amos',
      reference: 'Amos 1:1',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The words of Amos, who was among the shepherds of Tekoa, which he saw concerning Israel.'
    },
    {
      question: 'What was the alternative name of Moses’s father-in-law Jethro?',
      options: ['Reuel', 'Hobab', 'Balak', 'Achish'],
      answerIndex: 0,
      answer: 'Reuel',
      reference: 'Exodus 2:18',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'When they came to their father Reuel, he said, "How is it that you have come home so soon today?"'
    },
    {
      question: 'Which king of Babylon besieged and destroyed Jerusalem and the temple in 586 BC?',
      options: ['Sennacherib', 'Nebuchadnezzar', 'Cyrus', 'Belshazzar'],
      answerIndex: 1,
      answer: 'Nebuchadnezzar',
      reference: '2 Kings 25:8',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'In the fifth month, on the seventh day of the month... came Nebuzaradan, the captain of the bodyguard, a servant of the king of Babylon, to Jerusalem. And he burned the house of the Lord.'
    },
    {
      question: 'Who was the mother of King Solomon?',
      options: ['Abigail', 'Bathsheba', 'Maacah', 'Haggith'],
      answerIndex: 1,
      answer: 'Bathsheba',
      reference: '2 Samuel 12:24',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'Then David comforted his wife Bathsheba, and went in to her and lay with her, and she bore a son, and he called his name Solomon.'
    },
    {
      question: 'What island was the Apostle John exiled to when he received the Revelation?',
      options: ['Crete', 'Malta', 'Patmos', 'Cyprus'],
      answerIndex: 2,
      answer: 'Patmos',
      reference: 'Revelation 1:9',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'I, John, your brother and partner in the tribulation and the kingdom and the patient endurance... was on the island called Patmos on account of the word of God.'
    },
    {
      question: 'Who was the artisan filled with the Spirit of God to oversee the tabernacle construction?',
      options: ['Oholiab', 'Bezalel', 'Ahisamach', 'Hur'],
      answerIndex: 1,
      answer: 'Bezalel',
      reference: 'Exodus 31:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'See, I have called by name Bezalel the son of Uri, son of Hur, of the tribe of Judah.'
    },
    {
      question: 'Which canonical book contains no explicit mention of the name of God?',
      options: ['Job', 'Esther', 'Song of Solomon', 'Ecclesiastes'],
      answerIndex: 1,
      answer: 'Esther',
      reference: 'Book of Esther',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The Book of Esther is famous for never explicitly mentioning the name of God, though His providential care is evident throughout.'
    },
    {
      question: 'Who was the Roman centurion in Caesarea whose household received the Holy Spirit after Peter preached?',
      options: ['Julius', 'Cornelius', 'Longinus', 'Claudius'],
      answerIndex: 1,
      answer: 'Cornelius',
      reference: 'Acts 10:1',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'At Caesarea there was a man named Cornelius, a centurion of what was known as the Italian Cohort.'
    },
    {
      question: 'What was the name of the king of Salem and priest of God Most High who blessed Abraham?',
      options: ['Abimelech', 'Melchizedek', 'Pharaoh', 'Balaam'],
      answerIndex: 1,
      answer: 'Melchizedek',
      reference: 'Genesis 14:18',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'And Melchizedek king of Salem brought out bread and wine. (He was priest of God Most High.)'
    },
    {
      question: 'Who was the queen who risked her life to intercede for the Jewish people before King Ahasuerus?',
      options: ['Vashti', 'Esther', 'Abigail', 'Ruth'],
      answerIndex: 1,
      answer: 'Esther',
      reference: 'Esther 4:16',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'Go, gather all to be found in Susa, and hold a fast on my behalf... And I will go to the king, though it is against the law, and if I perish, I perish.'
    },
    {
      question: 'What was the name of the pool where Jesus told the blind man to wash his eyes?',
      options: ['Pool of Bethesda', 'Pool of Siloam', 'Pool of Samaria', 'King’s Pool'],
      answerIndex: 1,
      answer: 'Pool of Siloam',
      reference: 'John 9:7',
      difficulty: 'hard',
      category: 'Gospels',
      explanation: 'And he said to him, "Go, wash in the pool of Siloam" (which means Sent). So he went and washed and came back seeing.'
    },
    {
      question: 'Which prophet married a woman named Gomer as a living parable of spiritual unfaithfulness?',
      options: ['Hosea', 'Amos', 'Micah', 'Zephaniah'],
      answerIndex: 0,
      answer: 'Hosea',
      reference: 'Hosea 1:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'When the Lord first spoke through Hosea, the Lord said to Hosea, "Go, take to yourself a wife of whoredom and have children of whoredom."'
    },
    {
      question: 'Who accompanied Paul and Barnabas on their first missionary journey as their helper?',
      options: ['Silas', 'John Mark', 'Timothy', 'Luke'],
      answerIndex: 1,
      answer: 'John Mark',
      reference: 'Acts 13:5',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'When they arrived at Salamis, they proclaimed the word of God in the synagogues of the Jews. And they had John to assist them.'
    },
    {
      question: 'What precious metal was used to overlay the Ark of the Covenant inside and out?',
      options: ['Silver', 'Bronze', 'Gold', 'Brass'],
      answerIndex: 2,
      answer: 'Gold',
      reference: 'Exodus 25:11',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'You shall overlay it with pure gold, inside and outside shall you overlay it, and you shall make a molding of gold around it.'
    },
    {
      question: 'Who was the king of Moab who hired Balaam to curse the wandering Israelites?',
      options: ['Sihon', 'Og', 'Balak', 'Eglon'],
      answerIndex: 2,
      answer: 'Balak',
      reference: 'Numbers 22:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'And Balak the son of Zippor saw all that Israel had done to the Amorites.'
    },
    {
      question: 'What was the name of Naomi’s husband who died in Moab during the famine?',
      options: ['Mahlon', 'Elimelech', 'Chilion', 'Boaz'],
      answerIndex: 1,
      answer: 'Elimelech',
      reference: 'Ruth 1:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The name of the man was Elimelech and the name of his wife Naomi.'
    },
    {
      question: 'Who was the skilled scribe who returned to Jerusalem to teach God’s law in Ezra 7?',
      options: ['Nehemiah', 'Ezra', 'Zerubbabel', 'Jeshua'],
      answerIndex: 1,
      answer: 'Ezra',
      reference: 'Ezra 7:6',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'This Ezra went up from Babylonia. He was a scribe skilled in the Law of Moses that the Lord, the God of Israel, had given.'
    },
    {
      question: 'Which prophet had a vision of four living creatures and wheels within wheels by the river Kebar?',
      options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'],
      answerIndex: 2,
      answer: 'Ezekiel',
      reference: 'Ezekiel 1:16',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'As for the appearance of the wheels and their construction: their appearance was like the gleaming of beryl.'
    },
    {
      question: 'Who was the seller of purple cloth from Thyatira whose heart the Lord opened in Philippi?',
      options: ['Priscilla', 'Lydia', 'Damaris', 'Phoebe'],
      answerIndex: 1,
      answer: 'Lydia',
      reference: 'Acts 16:14',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'One of those who heard us was a woman named Lydia, from the city of Thyatira, a seller of purple goods, who was a worshiper of God.'
    },
    {
      question: 'What valley was the site of the miraculous victory of Jehoshaphat over Moab and Ammon?',
      options: ['Valley of Elah', 'Valley of Beracah', 'Valley of Achor', 'Valley of Siddim'],
      answerIndex: 1,
      answer: 'Valley of Beracah',
      reference: '2 Chronicles 20:26',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'On the fourth day they assembled in the Valley of Beracah, for there they blessed the Lord.'
    },
    {
      question: 'Who was the father of John the Baptist?',
      options: ['Simeon', 'Zechariah', 'Joseph', 'Theophilus'],
      answerIndex: 1,
      answer: 'Zechariah',
      reference: 'Luke 1:13',
      difficulty: 'hard',
      category: 'Gospels',
      explanation: 'But the angel said to him, "Do not be afraid, Zechariah, for your prayer has been heard, and your wife Elizabeth will bear you a son."'
    },
    {
      question: 'Which tribe of Israel received no territorial land inheritance because the Lord was their inheritance?',
      options: ['Judah', 'Levi', 'Benjamin', 'Dan'],
      answerIndex: 1,
      answer: 'Levi',
      reference: 'Joshua 13:33',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'But to the tribe of Moses did not give an inheritance; the Lord God of Israel is their inheritance.'
    },
    {
      question: 'Who was the Persian king who issued the decree allowing the Jewish exiles to return and rebuild the temple?',
      options: ['Darius', 'Xerxes', 'Cyrus the Great', 'Artaxerxes'],
      answerIndex: 2,
      answer: 'Cyrus the Great',
      reference: '2 Chronicles 36:23',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'Thus says Cyrus king of Persia: The Lord, the God of heaven, has given me all the kingdoms of the earth, and he has charged me to build him a house at Jerusalem.'
    },
    {
      question: 'What mountain peak was the site of Moses’ death after viewing the Promised Land?',
      options: ['Mount Sinai', 'Mount Nebo', 'Mount Hor', 'Mount Gerizim'],
      answerIndex: 1,
      answer: 'Mount Nebo',
      reference: 'Deuteronomy 34:1',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'Then Moses went up from the plains of Moab to Mount Nebo, to the top of Pisgah, which is opposite Jericho.'
    },
    {
      question: 'Who was the companion of Paul imprisoned with him in Philippi when an earthquake shook the prison?',
      options: ['Barnabas', 'Silas', 'Timothy', 'Titus'],
      answerIndex: 1,
      answer: 'Silas',
      reference: 'Acts 16:25',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'About midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them.'
    },
    {
      question: 'What prophet explicitly foretold that the Messiah would be born in Bethlehem Ephrathah?',
      options: ['Isaiah', 'Jeremiah', 'Micah', 'Amos'],
      answerIndex: 2,
      answer: 'Micah',
      reference: 'Micah 5:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel.'
    },
    {
      question: 'Who was the mother of Samuel the prophet?',
      options: ['Peninnah', 'Hannah', 'Abigail', 'Michal'],
      answerIndex: 1,
      answer: 'Hannah',
      reference: '1 Samuel 1:20',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'And in due time Hannah conceived and bore a son, and she called his name Samuel, for she said, "For I have asked him for the Lord."'
    },

    // Remaining medium/intermediate rigorous questions to complete 110 items
    {
      question: 'Who interpreted Pharaoh’s dreams about cows and grain?',
      options: ['Moses', 'Joseph', 'Daniel', 'Aaron'],
      answerIndex: 1,
      answer: 'Joseph',
      reference: 'Genesis 41:25',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Then Joseph said to Pharaoh, "The dreams of Pharaoh are one; God has revealed to Pharaoh what he is about to do."'
    },
    {
      question: 'What city’s walls collapsed after the people marched around them for seven days?',
      options: ['Jerusalem', 'Babylon', 'Jericho', 'Ai'],
      answerIndex: 2,
      answer: 'Jericho',
      reference: 'Joshua 6:20',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'So the people shouted, and the trumpets were blown... The wall fell down flat, so that the people went up into the city.'
    },
    {
      question: 'Who was the high priest who presided over the night trial of Jesus?',
      options: ['Caiaphas', 'Annas', 'Gamaliel', 'Nicodemus'],
      answerIndex: 0,
      answer: 'Caiaphas',
      reference: 'Matthew 26:57',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'Then those who had seized Jesus led him to Caiaphas the high priest, where the scribes and the elders had gathered.'
    },
    {
      question: 'On which mountain did Elijah challenge the prophets of Baal?',
      options: ['Mount Sinai', 'Mount Carmel', 'Mount Nebo', 'Mount Tabor'],
      answerIndex: 1,
      answer: 'Mount Carmel',
      reference: '1 Kings 18:19',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Now therefore send and gather all Israel to me at Mount Carmel, and the 450 prophets of Baal.'
    },
    {
      question: 'Who anointed David as king of Israel?',
      options: ['Eli', 'Samuel', 'Nathan', 'Zadok'],
      answerIndex: 1,
      answer: 'Samuel',
      reference: '1 Samuel 16:13',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Then Samuel took the horn of oil and anointed him in the midst of his brothers. And the Spirit of the Lord rushed upon David from that day forward.'
    },
    {
      question: 'Whose staff budded, blossomed, and produced almonds to confirm the chosen priesthood?',
      options: ['Moses', 'Aaron', 'Joshua', 'Phinehas'],
      answerIndex: 1,
      answer: 'Aaron',
      reference: 'Numbers 17:8',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'On the next day Moses went into the tent of the testimony, and behold, the staff of Aaron for the house of Levi had sprouted and put forth buds.'
    },
    {
      question: 'Who was thrown into the fiery furnace alongside Shadrach and Meshach?',
      options: ['Daniel', 'Abednego', 'Ezra', 'Nehemiah'],
      answerIndex: 1,
      answer: 'Abednego',
      reference: 'Daniel 3:23',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'And these three men, Shadrach, Meshach, and Abednego, fell bound into the burning fiery furnace.'
    },
    {
      question: 'Which monarch visited King Solomon to test his wisdom with hard questions?',
      options: ['Queen Esther', 'Queen of Sheba', 'Queen Jezebel', 'Queen Vashti'],
      answerIndex: 1,
      answer: 'Queen of Sheba',
      reference: '1 Kings 10:1',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'When the queen of sheba heard of the fame of Solomon... she came to test him with hard questions.'
    },
    {
      question: 'Who was the first Christian martyr stoned for his faith?',
      options: ['Stephen', 'James', 'Antipas', 'Philip'],
      answerIndex: 0,
      answer: 'Stephen',
      reference: 'Acts 7:59',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'And as they were stoning Stephen, he called out, "Lord Jesus, receive my spirit."'
    },
    {
      question: 'What miracle did Jesus perform at the wedding in Cana?',
      options: ['Walked on water', 'Turned water into wine', 'Healed a blind man', 'Multiplied loaves'],
      answerIndex: 1,
      answer: 'Turned water into wine',
      reference: 'John 2:9',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'When the master of the feast tasted the water now become wine, and did not know where it came from... the master of the feast called the bridegroom.'
    },
    {
      question: 'Who was the baby placed in a papyrus basket by the Nile and adopted by Pharaoh’s daughter?',
      options: ['Moses', 'Aaron', 'Joshua', 'Gideon'],
      answerIndex: 0,
      answer: 'Moses',
      reference: 'Exodus 2:3-10',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'She took for him a basket made of bulrushes and daubed it with bitumen and pitch. She put the child in it and placed it among the reeds by the river bank.'
    },
    {
      question: 'What was the name of Abraham’s first son born through Hagar?',
      options: ['Isaac', 'Ishmael', 'Midian', 'Zimran'],
      answerIndex: 1,
      answer: 'Ishmael',
      reference: 'Genesis 16:15',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'And Hagar bore Abram a son, and Abram called the name of his son, whom Hagar bore, Ishmael.'
    },
    {
      question: 'Who wrote the majority of the epistles in the New Testament?',
      options: ['Peter', 'John', 'Paul', 'James'],
      answerIndex: 2,
      answer: 'Paul',
      reference: 'New Testament Epistles',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'The Apostle Paul authored 13 canonical epistles spanning from Romans to Philemon.'
    },
    {
      question: 'What physical ailment did blind Bartimaeus suffer from before Jesus healed him?',
      options: ['Leprosy', 'Blindness', 'Paralysis', 'Deafness'],
      answerIndex: 1,
      answer: 'Blindness',
      reference: 'Mark 10:46',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'And they came to Jericho. And as he was leaving Jericho with his disciples and a great crowd, Bartimaeus a blind beggar was sitting by the roadside.'
    },
    {
      question: 'Who was chosen to replace Judas Iscariot as an apostle?',
      options: ['Barnabas', 'Matthias', 'Silas', 'Timothy'],
      answerIndex: 1,
      answer: 'Matthias',
      reference: 'Acts 1:26',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'And they cast lots for them, and the lot fell on Matthias, and he was numbered with the eleven apostles.'
    },
    {
      question: 'What body of water did the Israelites cross on dry ground during the Exodus?',
      options: ['Mediterranean Sea', 'Sea of Galilee', 'Red Sea', 'Dead Sea'],
      answerIndex: 2,
      answer: 'Red Sea',
      reference: 'Exodus 14:21',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Then Moses stretched out his hand over the sea, and the Lord drove the sea back by a strong east wind all night and made the sea dry land.'
    },
    {
      question: 'Who was the wicked king of Israel married to Jezebel?',
      options: ['Ahab', 'Jeroboam', 'Rehoboam', 'Manasseh'],
      answerIndex: 0,
      answer: 'Ahab',
      reference: '1 Kings 16:31',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'And Ahab the son of Omri reigned over Israel in Samaria twenty-two years... and he took for wife Jezebel the daughter of Ethbaal.'
    },
    {
      question: 'What prophetic book features a vision of a valley of dry bones coming to life?',
      options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'],
      answerIndex: 2,
      answer: 'Ezekiel',
      reference: 'Ezekiel 37:1',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'The hand of the Lord was upon me, and he brought me out in the Spirit of the Lord and set me down in the middle of the valley; it was full of bones.'
    },
    {
      question: 'Who washed his hands declaring himself innocent of Jesus’ blood?',
      options: ['Herod Antipas', 'Pontius Pilate', 'Caesar Augustus', 'Felix'],
      answerIndex: 1,
      answer: 'Pontius Pilate',
      reference: 'Matthew 27:24',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'So when Pilate saw that he was gaining nothing... he took water and washed his hands before the crowd, saying, "I am innocent of this man’s blood."'
    },
    {
      question: 'What city was Saul heading toward when he encountered the risen Christ?',
      options: ['Jerusalem', 'Antioch', 'Damascus', 'Tarsus'],
      answerIndex: 2,
      answer: 'Damascus',
      reference: 'Acts 9:3',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'Now as he went on his way, he approached Damascus, and suddenly a light from heaven shone around him.'
    },
    {
      question: 'Who was the judge renowned for his physical strength associated with his nazirite vow?',
      options: ['Gideon', 'Jephthah', 'Samson', 'Barak'],
      answerIndex: 2,
      answer: 'Samson',
      reference: 'Judges 16:17',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'A razor has never come upon my head, for I have been a Nazirite to God from my mother’s womb.'
    },
    {
      question: 'What tree did Zacchaeus climb to see Jesus pass by?',
      options: ['Fig tree', 'Sycamore tree', 'Olive tree', 'Cedar tree'],
      answerIndex: 1,
      answer: 'Sycamore tree',
      reference: 'Luke 19:4',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'So he ran on ahead and climbed up into a sycamore tree to see him, for he was about to pass that way.'
    },
    {
      question: 'Who was Ruth’s loyal mother-in-law?',
      options: ['Orpah', 'Naomi', 'Hannah', 'Abigail'],
      answerIndex: 1,
      answer: 'Naomi',
      reference: 'Ruth 1:3',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Now Elimelech, the husband of Naomi, died, and she was left with her two sons.'
    },
    {
      question: 'Which prophet succeeded Elijah and received a double portion of his spirit?',
      options: ['Amos', 'Elisha', 'Micah', 'Hosea'],
      answerIndex: 1,
      answer: 'Elisha',
      reference: '2 Kings 2:9',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'And Elisha said, "Please let there be a double portion of your spirit on me."'
    },
    {
      question: 'What is Hebrews Chapter 11 famously known as?',
      options: ['The Love Chapter', 'The Hall of Faith', 'The Creation Record', 'The Resurrection Chapter'],
      answerIndex: 1,
      answer: 'The Hall of Faith',
      reference: 'Hebrews 11:1',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'Now faith is the assurance of things hoped for, the conviction of things not seen... highlighting the great heroes of faith.'
    },
    {
      question: 'Who was king when Daniel was thrown into the lions’ den?',
      options: ['Nebuchadnezzar', 'Darius the Mede', 'Belshazzar', 'Cyrus'],
      answerIndex: 1,
      answer: 'Darius the Mede',
      reference: 'Daniel 6:1',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'It pleased Darius to set over the kingdom 120 satraps... and over them three officials, of whom Daniel was one.'
    },
    {
      question: 'What was the name of the garden where Jesus prayed in agony before his arrest?',
      options: ['Eden', 'Gethsemane', 'Olivet', 'Getsemani'],
      answerIndex: 1,
      answer: 'Gethsemane',
      reference: 'Matthew 26:36',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'Then Jesus went with them to a place called Gethsemane, and he said to his disciples, "Sit here, while I go over there and pray."'
    },
    {
      question: 'Who was the faithful priest who mentored young Samuel at Shiloh?',
      options: ['Eli', 'Zadok', 'Ahimelech', 'Abiathar'],
      answerIndex: 0,
      answer: 'Eli',
      reference: '1 Samuel 1:9',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'After they had eaten and drunk in Shiloh, Hannah rose. Now Eli the priest was sitting on the seat beside the doorpost of the temple of the Lord.'
    },
    {
      question: 'What language was the majority of the Old Testament originally written in?',
      options: ['Greek', 'Aramaic', 'Hebrew', 'Latin'],
      answerIndex: 2,
      answer: 'Hebrew',
      reference: 'Old Testament Languages',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'The vast majority of the Hebrew Bible (Old Testament) was originally composed in classical Hebrew, with minor portions in Aramaic.'
    },

    // Additional foundational questions to ensure exactly 110 rigorous items
    {
      question: 'Who built the ark according to Genesis?',
      options: ['Moses', 'Noah', 'Abraham', 'David'],
      answerIndex: 1,
      answer: 'Noah',
      reference: 'Genesis 6:14',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Make yourself an ark of gopher wood.'
    },
    {
      question: 'What is the first book of the New Testament?',
      options: ['Genesis', 'John', 'Matthew', 'Acts'],
      answerIndex: 2,
      answer: 'Matthew',
      reference: 'Matthew 1:1',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.'
    },
    {
      question: 'Who was swallowed by a great fish for disobeying God’s call?',
      options: ['Jonah', 'Job', 'Joshua', 'Joel'],
      answerIndex: 0,
      answer: 'Jonah',
      reference: 'Jonah 1:17',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'And the Lord appointed a great fish to swallow up Jonah.'
    },
    {
      question: 'Where was Jesus born?',
      options: ['Nazareth', 'Jerusalem', 'Capernaum', 'Bethlehem'],
      answerIndex: 3,
      answer: 'Bethlehem',
      reference: 'Matthew 2:1',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Now after Jesus was born in Bethlehem of Judea in the days of Herod the king.'
    },
    {
      question: 'How many disciples did Jesus choose to be his primary apostles?',
      options: ['7', '10', '12', '40'],
      answerIndex: 2,
      answer: '12',
      reference: 'Matthew 10:1',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'And he called to him his twelve disciples and gave them authority over unclean spirits.'
    },
    {
      question: 'Who killed Goliath the giant Philistine warrior?',
      options: ['Saul', 'David', 'Samson', 'Solomon'],
      answerIndex: 1,
      answer: 'David',
      reference: '1 Samuel 17:50',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'So David prevailed over the philistine with a sling and with a stone.'
    },
    {
      question: 'What is the longest book in the Bible by chapter count?',
      options: ['Genesis', 'Isaiah', 'Psalms', 'Jeremiah'],
      answerIndex: 2,
      answer: 'Psalms',
      reference: 'Book of Psalms',
      difficulty: 'easy',
      category: 'Poetry',
      explanation: 'The Book of Psalms contains 150 individual chapters of praise, prayer, and prophecy.'
    },
    {
      question: 'Who was the earthly mother of Jesus?',
      options: ['Elizabeth', 'Martha', 'Mary', 'Magdalene'],
      answerIndex: 2,
      answer: 'Mary',
      reference: 'Luke 1:30',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'And the angel said to her, "Do not be afraid, Mary, for you have found favor with God."'
    },
    {
      question: 'What river was Jesus baptized in by John the Baptist?',
      options: ['Jordan River', 'Nile River', 'Euphrates', 'Tigris'],
      answerIndex: 0,
      answer: 'Jordan River',
      reference: 'Matthew 3:13',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Then Jesus came from Galilee to the Jordan to John, to be baptized by him.'
    },
    {
      question: 'Who was known as a man after God’s own heart in 1 Samuel?',
      options: ['Solomon', 'Saul', 'David', 'Samuel'],
      answerIndex: 2,
      answer: 'David',
      reference: '1 Samuel 13:14',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'The Lord has sought out a man after his own heart, and the Lord has commanded him to be prince over his people.'
    },

    // Expanded Scholarly Bible Questions
    {
      question: 'Which child king of Judah was hidden in the house of the LORD for six years while Athaliah usurped the throne?',
      options: ['Joash', 'Josiah', 'Manasseh', 'Uzziah'],
      answerIndex: 0,
      answer: 'Joash',
      reference: '2 Kings 11:3',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'Joash was hidden with his nurse in the house of the Lord six years, while Athaliah reigned over the land.'
    },
    {
      question: 'In Revelation 9, what is the name of the angel of the bottomless pit in Hebrew and Greek?',
      options: ['Abaddon & Apollyon', 'Lucifer & Beelzebub', 'Belial & Mammon', 'Satan & Legion'],
      answerIndex: 0,
      answer: 'Abaddon & Apollyon',
      reference: 'Revelation 9:11',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'They have as king over them the angel of the bottomless pit. His name in Hebrew is Abaddon, and in Greek he is called Apollyon.'
    },
    {
      question: 'Which prophet saw a vision of a flying scroll twenty cubits long and ten cubits wide representing a curse?',
      options: ['Zechariah', 'Haggai', 'Malachi', 'Amos'],
      answerIndex: 0,
      answer: 'Zechariah',
      reference: 'Zechariah 5:2',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'He said to me, "What do you see?" I answered, "I see a flying scroll; its length is twenty cubits, and its width ten cubits."'
    },
    {
      question: 'Which judge made a tragic vow that resulted in offering his only daughter after returning from victory over Ammon?',
      options: ['Jephthah', 'Gideon', 'Samson', 'Ehud'],
      answerIndex: 0,
      answer: 'Jephthah',
      reference: 'Judges 11:30-31',
      difficulty: 'expert',
      category: 'Old Testament',
      explanation: 'And Jephthah made a vow to the Lord and said, "If you will give the Ammonites into my hand, whatever comes out from the doors of my house to meet me... shall be the Lord’s."'
    },
    {
      question: 'In Paul’s letter to Titus, on which Mediterranean island was Titus left to set in order remaining matters and appoint elders?',
      options: ['Crete', 'Cyprus', 'Malta', 'Rhodes'],
      answerIndex: 0,
      answer: 'Crete',
      reference: 'Titus 1:5',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'This is why I left you in Crete, so that you might put what remained into order and appoint elders in every town as I directed you.'
    },
    {
      question: 'What was the name of the sacred location where Jacob wrestled with a man until daybreak and received the name Israel?',
      options: ['Peniel', 'Bethel', 'Shiloh', 'Mizpah'],
      answerIndex: 0,
      answer: 'Peniel',
      reference: 'Genesis 32:30',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'So Jacob called the name of the place Peniel, saying, "For I have seen God face to face, and yet my life has been delivered."'
    },
    {
      question: 'Which king of Israel committed suicide by setting the royal palace on fire over himself after reigning for only 7 days?',
      options: ['Zimri', 'Tibni', 'Omri', 'Elah'],
      answerIndex: 0,
      answer: 'Zimri',
      reference: '1 Kings 16:15-18',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'In the twenty-seventh year of Asa king of Judah, Zimri reigned seven days in Tirzah... he went into the citadel of the king’s house and burned the king’s house over him with fire.'
    },
    {
      question: 'What was the title and meaning of the Greek term "Maranatha" used by Paul in 1 Corinthians 16:22?',
      options: ['Our Lord, come!', 'Praise be to God!', 'Holy is the Lord', 'Grace be with you'],
      answerIndex: 0,
      answer: 'Our Lord, come!',
      reference: '1 Corinthians 16:22',
      difficulty: 'very_hard',
      category: 'New Testament',
      explanation: 'If anyone has no love for the Lord, let him be accursed. Our Lord, come! (Maranatha).'
    },
    {
      question: 'Who was the prophet sent by God to rebuke King David after he numbered the military forces of Israel and Judah?',
      options: ['Gad', 'Nathan', 'Ahijah', 'Shemaiah'],
      answerIndex: 0,
      answer: 'Gad',
      reference: '2 Samuel 24:11',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'And when David arose in the morning, the word of the Lord came to the prophet Gad, David’s seer.'
    },
    {
      question: 'In Ezekiel 3, what symbolic object was Ezekiel instructed to eat before going to proclaim God’s message to Israel?',
      options: ['A scroll', 'Unleavened bread', 'A bitter herb', 'A honeycomb'],
      answerIndex: 0,
      answer: 'A scroll',
      reference: 'Ezekiel 3:1',
      difficulty: 'very_hard',
      category: 'Old Testament',
      explanation: 'And he said to me, "Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel."'
    },
    {
      question: 'In John 5, at which pool with five colonnades did Jesus heal the invalid who had been paralyzed for 38 years?',
      options: ['Bethesda', 'Siloam', 'Gihon', 'Engedi'],
      answerIndex: 0,
      answer: 'Bethesda',
      reference: 'John 5:2-9',
      difficulty: 'hard',
      category: 'Gospels',
      explanation: 'Now there is in Jerusalem by the Sheep Gate a pool, in Aramaic called Bethesda, which has five roofed colonnades.'
    },
    {
      question: 'What was the name of Timothy’s godly grandmother mentioned by Paul in 2 Timothy as having sincere faith?',
      options: ['Lois', 'Eunice', 'Phoebe', 'Claudia'],
      answerIndex: 0,
      answer: 'Lois',
      reference: '2 Timothy 1:5',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'I am reminded of your sincere faith, a faith that dwelt first in your grandmother Lois and your mother Eunice.'
    },
    {
      question: 'In Acts 17, in which famous Greek assembly did Paul deliver his sermon regarding the "Unknown God"?',
      options: ['Areopagus', 'Parthenon', 'Agora', 'Colosseum'],
      answerIndex: 0,
      answer: 'Areopagus',
      reference: 'Acts 17:22',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'So Paul, standing in the midst of the Areopagus, said: "Men of Athens, I perceive that in every way you are very religious."'
    },
    {
      question: 'Which prophet prophesied during the reign of Josiah, proclaiming "The Great Day of the LORD is Near"?',
      options: ['Zephaniah', 'Haggai', 'Malachi', 'Joel'],
      answerIndex: 0,
      answer: 'Zephaniah',
      reference: 'Zephaniah 1:1',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The word of the Lord that came to Zephaniah... in the days of Josiah the son of Amon, king of Judah.'
    },
    {
      question: 'What was the name of the valley where David engaged in single combat against Goliath of Gath?',
      options: ['Valley of Elah', 'Valley of Jezreel', 'Valley of Hinnom', 'Valley of Baca'],
      answerIndex: 0,
      answer: 'Valley of Elah',
      reference: '1 Samuel 17:2',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'And Saul and the men of Israel were gathered, and encamped in the Valley of Elah, and drew up in line of battle against the Philistines.'
    },
    {
      question: 'Which deacon preached in Samaria and was instructed by an angel to meet the Ethiopian eunuch on the Gaza road?',
      options: ['Philip', 'Stephen', 'Prochorus', 'Timon'],
      answerIndex: 0,
      answer: 'Philip',
      reference: 'Acts 8:26',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'Now an angel of the Lord said to Philip, "Rise and go toward the south to the road that goes down from Jerusalem to Gaza."'
    },
    {
      question: 'What covenant sign was given to Noah and all living creatures after the global flood?',
      options: ['Rainbow', 'Circumcision', 'Sabbath', 'Passover'],
      answerIndex: 0,
      answer: 'Rainbow',
      reference: 'Genesis 9:13',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'I have set my bow in the cloud, and it shall be a sign of the covenant between me and the earth.'
    },
    {
      question: 'Who was the Babylonian king who saw handwriting on the wall during his lavish banquet?',
      options: ['Belshazzar', 'Nebuchadnezzar', 'Nabonidus', 'Evil-Merodach'],
      answerIndex: 0,
      answer: 'Belshazzar',
      reference: 'Daniel 5:1',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'King Belshazzar made a great feast for a thousand of his lords and drank wine in front of the thousand.'
    },
    {
      question: 'Which apostle was a tax collector before being called by Jesus?',
      options: ['Matthew', 'Andrew', 'Thomas', 'Bartholomew'],
      answerIndex: 0,
      answer: 'Matthew',
      reference: 'Matthew 9:9',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'As Jesus passed on from there, he saw a man called Matthew sitting at the tax booth, and he said to him, "Follow me."'
    },
    {
      question: 'Who was the sister of Mary and Lazarus who was anxious and troubled about many serving tasks?',
      options: ['Martha', 'Salome', 'Joanna', 'Susanna'],
      answerIndex: 0,
      answer: 'Martha',
      reference: 'Luke 10:41',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'But the Lord answered her, "Martha, Martha, you are anxious and troubled about many things."'
    },
    // --- EXPANDED HIGH-QUALITY BIBLE QUESTIONS (OLD & NEW TESTAMENT) ---
    {
      question: 'In the book of Judges, what fleece test did Gideon use to confirm God would save Israel through him?',
      options: ['Dew on the fleece only, then dry fleece on wet ground', 'Fleece catching fire, then soaked in oil', 'Fleece turning white, then turning purple', 'Fleece floating on water, then sinking in dust'],
      answerIndex: 0,
      answer: 'Dew on the fleece only, then dry fleece on wet ground',
      reference: 'Judges 6:37-40',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Gideon first asked for dew only on the fleece with all the ground dry, and the next night for dry fleece with dew on all the ground.'
    },
    {
      question: 'What was the name of the servant girl who was so overjoyed to hear Peter’s voice at the gate that she forgot to open it?',
      options: ['Rhoda', 'Tabitha', 'Priscilla', 'Damaris'],
      answerIndex: 0,
      answer: 'Rhoda',
      reference: 'Acts 12:13-14',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'When Rhoda recognized Peter’s voice, in her joy she did not open the gate but ran in and reported that Peter was standing outside.'
    },
    {
      question: 'According to Philippians 4, what surpasses all understanding and will guard believers\' hearts and minds in Christ Jesus?',
      options: ['The peace of God', 'The wisdom of God', 'The power of God', 'The righteousness of God'],
      answerIndex: 0,
      answer: 'The peace of God',
      reference: 'Philippians 4:7',
      difficulty: 'easy',
      category: 'Epistles',
      explanation: 'And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.'
    },
    {
      question: 'In 1 Samuel 17, how many smooth stones did David choose from the brook before facing Goliath?',
      options: ['Five', 'Three', 'Seven', 'Twelve'],
      answerIndex: 0,
      answer: 'Five',
      reference: '1 Samuel 17:40',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'David took his staff in his hand and chose five smooth stones from the brook and put them in his shepherd\'s pouch.'
    },
    {
      question: 'What did Solomon ask God for at Gibeon when the Lord appeared to him in a dream at night?',
      options: ['An understanding heart to judge God’s people', 'Long life and victory over enemies', 'Unsurpassed wealth and earthly honor', 'A mighty army of horsemen and chariots'],
      answerIndex: 0,
      answer: 'An understanding heart to judge God’s people',
      reference: '1 Kings 3:9',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Solomon requested an understanding mind to govern God’s great people and to discern between good and evil.'
    },
    {
      question: 'Who was the Roman centurion in Caesarea of the Italian Cohort who feared God and sent for Peter?',
      options: ['Cornelius', 'Julius', 'Claudius Lysias', 'Publius'],
      answerIndex: 0,
      answer: 'Cornelius',
      reference: 'Acts 10:1-2',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'Cornelius was a centurion of what was known as the Italian Cohort, a devout man who feared God with all his household.'
    },
    {
      question: 'What city’s walls fell flat after the Israelites marched around them once a day for six days and seven times on the seventh day?',
      options: ['Jericho', 'Ai', 'Hazor', 'Lachish'],
      answerIndex: 0,
      answer: 'Jericho',
      reference: 'Joshua 6:20',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'When the priests blew the trumpets and the people shouted with a great shout, the wall of Jericho fell down flat.'
    },
    {
      question: 'In John 11, what is the shortest verse in the English Bible describing Jesus\' deep compassion at Lazarus\' tomb?',
      options: ['Jesus wept', 'Rejoice always', 'Pray without ceasing', 'He is risen'],
      answerIndex: 0,
      answer: 'Jesus wept',
      reference: 'John 11:35',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'John 11:35 records simply and powerfully: "Jesus wept."'
    },
    {
      question: 'Which prophet was swallowed by a great fish after attempting to flee to Tarshish from the presence of the Lord?',
      options: ['Jonah', 'Amos', 'Micah', 'Hosea'],
      answerIndex: 0,
      answer: 'Jonah',
      reference: 'Jonah 1:17',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'And the Lord appointed a great fish to swallow up Jonah, and Jonah was in the belly of the fish three days and three nights.'
    },
    {
      question: 'On what island was the Apostle John exiled when he received the revelation of Jesus Christ?',
      options: ['Patmos', 'Cyprus', 'Crete', 'Malta'],
      answerIndex: 0,
      answer: 'Patmos',
      reference: 'Revelation 1:9',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'John writes that he was on the island called Patmos on account of the word of God and the testimony of Jesus.'
    },
    {
      question: 'Who was the king of Salem and priest of God Most High who brought out bread and wine to Abram?',
      options: ['Melchizedek', 'Jethro', 'Abimelech', 'Eliezer'],
      answerIndex: 0,
      answer: 'Melchizedek',
      reference: 'Genesis 14:18',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Melchizedek king of Salem brought out bread and wine; he was priest of God Most High, and he blessed Abram.'
    },
    {
      question: 'In Matthew 2, what three specific gifts did the wise men (Magi) present to the young child Jesus?',
      options: ['Gold, frankincense, and myrrh', 'Silver, cedar, and olive oil', 'Gold, cinnamon, and purple cloth', 'Frankincense, pomegranate, and alabaster'],
      answerIndex: 0,
      answer: 'Gold, frankincense, and myrrh',
      reference: 'Matthew 2:11',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Opening their treasures, they offered him gifts, gold and frankincense and myrrh.'
    },
    {
      question: 'Which prophet challenged 450 prophets of Baal to a contest on Mount Carmel to see which God would answer by fire?',
      options: ['Elijah', 'Elisha', 'Micaiah', 'Obadiah'],
      answerIndex: 0,
      answer: 'Elijah',
      reference: '1 Kings 18:21-24',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Elijah summoned Israel and the prophets of Baal to Mount Carmel, declaring: "The God who answers by fire, he is God."'
    },
    {
      question: 'What musical instrument did David play that refreshed King Saul and caused the harmful spirit to depart from him?',
      options: ['Lyre (Harp)', 'Shofar', 'Cymbals', 'Flute'],
      answerIndex: 0,
      answer: 'Lyre (Harp)',
      reference: '1 Samuel 16:23',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Whenever the harmful spirit from God was upon Saul, David took the lyre and played it with his hand, and Saul was refreshed.'
    },
    {
      question: 'In Romans 8, what does Paul declare can never separate believers from the love of God in Christ Jesus?',
      options: ['Neither death nor life, nor angels nor rulers, nor anything in all creation', 'Only unconfessed transgressions', 'Physical tribulation and persecution', 'The strict observance of the ceremonial law'],
      answerIndex: 0,
      answer: 'Neither death nor life, nor angels nor rulers, nor anything in all creation',
      reference: 'Romans 8:38-39',
      difficulty: 'medium',
      category: 'Epistles',
      explanation: 'Paul affirms with absolute certainty that nothing in all creation will be able to separate us from the love of God in Christ Jesus.'
    },
    {
      question: 'Who was the woman of Thyatira, a seller of purple goods, whose heart the Lord opened to pay attention to Paul’s preaching?',
      options: ['Lydia', 'Phoebe', 'Chloe', 'Priscilla'],
      answerIndex: 0,
      answer: 'Lydia',
      reference: 'Acts 16:14',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'Lydia was a seller of purple fabrics from Thyatira; the Lord opened her heart to respond to Paul’s message in Philippi.'
    },
    {
      question: 'What was the name of Moses\' brother who served as his spokesman and became the first High Priest of Israel?',
      options: ['Aaron', 'Hur', 'Eleazar', 'Caleb'],
      answerIndex: 0,
      answer: 'Aaron',
      reference: 'Exodus 4:14; Exodus 28:1',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'God appointed Aaron the Levite as Moses’ brother and spokesman, later consecrating him and his sons as priests.'
    },
    {
      question: 'Which book of the Bible never explicitly mentions the name of God, yet vividly demonstrates His divine providence?',
      options: ['Esther', 'Ruth', 'Song of Solomon', 'Ecclesiastes'],
      answerIndex: 0,
      answer: 'Esther',
      reference: 'Book of Esther',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'The Book of Esther does not explicitly mention the name of God, yet His providential sovereignty orchestrates every turning point.'
    },
    {
      question: 'What prophet witnessed a valley of dry bones come together bone to bone, covered with sinew and flesh, and filled with breath?',
      options: ['Ezekiel', 'Jeremiah', 'Isaiah', 'Zechariah'],
      answerIndex: 0,
      answer: 'Ezekiel',
      reference: 'Ezekiel 37:1-10',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Ezekiel prophesied over the dry bones in the valley, and breath came into them, and they lived and stood on their feet.'
    },
    {
      question: 'In 2 Corinthians 12, what did the Lord say to Paul when Paul pleaded three times for his thorn in the flesh to be removed?',
      options: ['"My grace is sufficient for you, for my power is made perfect in weakness"', '"Be healed of your infirmity and go in peace"', '"Your faith has made you completely whole"', '"Wait upon the Lord and renew your strength"'],
      answerIndex: 0,
      answer: '"My grace is sufficient for you, for my power is made perfect in weakness"',
      reference: '2 Corinthians 12:9',
      difficulty: 'medium',
      category: 'Epistles',
      explanation: 'The Lord answered Paul: "My grace is sufficient for you, for my power is made perfect in weakness."'
    },
    {
      question: 'Which king of Israel married Jezebel, daughter of Ethbaal king of the Sidonians, and promoted Baal worship in Samaria?',
      options: ['Ahab', 'Jeroboam', 'Jehoram', 'Baasha'],
      answerIndex: 0,
      answer: 'Ahab',
      reference: '1 Kings 16:30-31',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Ahab the son of Omri did evil in the sight of the Lord more than all who were before him, marrying Jezebel and serving Baal.'
    },
    {
      question: 'What are the fruit of the Spirit listed by the Apostle Paul in Galatians 5?',
      options: ['Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control', 'Faith, hope, charity, fasting, almsgiving, prayer, and vigilance', 'Wisdom, knowledge, faith, healing, miracles, prophecy, and tongues', 'Righteousness, justice, mercy, truth, obedience, and perseverance'],
      answerIndex: 0,
      answer: 'Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control',
      reference: 'Galatians 5:22-23',
      difficulty: 'easy',
      category: 'Epistles',
      explanation: 'Paul lists the ninefold fruit of the Spirit in Galatians 5:22-23, concluding that "against such things there is no law."'
    },
    {
      question: 'Who was the prophetess and judge of Israel who sat under a palm tree between Ramah and Bethel and summoned Barak?',
      options: ['Deborah', 'Huldah', 'Miriam', 'Noadiah'],
      answerIndex: 0,
      answer: 'Deborah',
      reference: 'Judges 4:4-5',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Deborah, a prophetess and the wife of Lappidoth, was judging Israel at that time beneath the palm of Deborah.'
    },
    {
      question: 'According to Hebrews 11:1, how is faith classically defined in scripture?',
      options: ['The assurance of things hoped for, the conviction of things not seen', 'A blind leap of emotion in times of difficulty', 'Trusting that all our earthly desires will be fulfilled', 'Intellectual assent to historical biblical facts'],
      answerIndex: 0,
      answer: 'The assurance of things hoped for, the conviction of things not seen',
      reference: 'Hebrews 11:1',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'Hebrews 11:1 defines faith as the assurance of things hoped for and the conviction of things not seen.'
    },
    {
      question: 'Who was the Moabite woman who declared to her mother-in-law Naomi: "Where you go I will go, and where you lodge I will lodge. Your people shall be my people, and your God my God"?',
      options: ['Ruth', 'Orpah', 'Rahab', 'Tamar'],
      answerIndex: 0,
      answer: 'Ruth',
      reference: 'Ruth 1:16',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Ruth refused to leave Naomi, speaking these timeless words of covenant faithfulness to Naomi and the Lord God.'
    },
    {
      question: 'What was the name of the Pharisee and ruler of the Jews who came to Jesus by night to ask about being born again?',
      options: ['Nicodemus', 'Joseph of Arimathea', 'Gamaliel', 'Simon the Pharisee'],
      answerIndex: 0,
      answer: 'Nicodemus',
      reference: 'John 3:1-3',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Nicodemus came to Jesus by night and was told that unless one is born again, he cannot see the kingdom of God.'
    },
    {
      question: 'In 2 Kings 2, how was the prophet Elijah taken up into heaven in the presence of Elisha?',
      options: ['In a whirlwind with a chariot and horses of fire', 'In a calm cloud of divine glory', 'On the wings of angels across the Jordan', 'By a pillar of smoke ascending from the mountains'],
      answerIndex: 0,
      answer: 'In a whirlwind with a chariot and horses of fire',
      reference: '2 Kings 2:11',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'A chariot of fire and horses of fire separated Elijah and Elisha, and Elijah went up by a whirlwind into heaven.'
    },
    {
      question: 'Which evangelist was led by the Spirit to the desert road from Jerusalem to Gaza to explain Isaiah 53 to an Ethiopian official?',
      options: ['Philip', 'Stephen', 'Prochorus', 'Timon'],
      answerIndex: 0,
      answer: 'Philip',
      reference: 'Acts 8:26-35',
      difficulty: 'medium',
      category: 'New Testament',
      explanation: 'Philip ran to the Ethiopian eunuch, explained the prophecy of Isaiah, and proclaimed the good news of Jesus to him.'
    },
    {
      question: 'In Genesis 28, what did Jacob see in a dream at Bethel that reached from earth to heaven?',
      options: ['A ladder (stairway) with angels of God ascending and descending', 'A river of crystal water flowing from a golden altar', 'A pillar of burning fire reaching to the clouds', 'A chariot of silver carrying the ark of the covenant'],
      answerIndex: 0,
      answer: 'A ladder (stairway) with angels of God ascending and descending',
      reference: 'Genesis 28:12',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Jacob dreamed and behold, a ladder was set up on earth with its top reaching to heaven, and the angels of God were ascending and descending on it.'
    },
    {
      question: 'Which young king of Judah began to reign at age eight and repaired the temple, where Hilkiah found the Book of the Law?',
      options: ['Josiah', 'Hezekiah', 'Joash', 'Manasseh'],
      answerIndex: 0,
      answer: 'Josiah',
      reference: '2 Kings 22:1-8',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'King Josiah spearheaded major reforms throughout Judah after the Book of the Law was rediscovered in the temple of the Lord.'
    },
    {
      question: 'In Matthew 14, which disciple stepped out of the boat and walked on the water toward Jesus before sinking in fear?',
      options: ['Peter', 'John', 'James', 'Andrew'],
      answerIndex: 0,
      answer: 'Peter',
      reference: 'Matthew 14:28-30',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Peter got out of the boat and walked on the water toward Jesus, but when he saw the wind, he was afraid and cried out, "Lord, save me!"'
    },
    {
      question: 'What prophetic titles in Isaiah 9:6 are given to the child who will be born and the Son who will be given?',
      options: ['Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace', 'Holy One of Israel, Shield of David, Horn of Salvation', 'Lion of Judah, Root of Jesse, Bright Morning Star', 'Author and Finisher, Great Shepherd, King of Salem'],
      answerIndex: 0,
      answer: 'Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace',
      reference: 'Isaiah 9:6',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Isaiah foretells the Messiah’s reign: "His name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."'
    },
    {
      question: 'In Acts 9, on what road was Saul traveling when a blinding light from heaven shone and Jesus spoke to him?',
      options: ['The road to Damascus', 'The road to Jericho', 'The road to Emmaus', 'The road to Antioch'],
      answerIndex: 0,
      answer: 'The road to Damascus',
      reference: 'Acts 9:3',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'As Saul approached Damascus on his mission to arrest believers, a light from heaven shone around him and Jesus revealed Himself.'
    },
    {
      question: 'What did the prophet Elisha instruct Naaman the Syrian army commander to do in order to be cleansed of his leprosy?',
      options: ['Wash seven times in the Jordan River', 'Offer twenty silver talents at the altar of Bethel', 'Fast for forty days in the wilderness of Gilead', 'Sprinkle sheep blood upon the altar of Samaria'],
      answerIndex: 0,
      answer: 'Wash seven times in the Jordan River',
      reference: '2 Kings 5:10',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Elisha sent word to Naaman to dip seven times in the Jordan River, and his flesh was restored like the flesh of a little child.'
    },
    {
      question: 'In the Sermon on the Mount, where did Jesus instruct believers to lay up lasting treasures?',
      options: ['In heaven, where neither moth nor rust destroys and thieves do not break in', 'In the temple treasury of Jerusalem', 'In secret storehouses hidden from collectors', 'In land and inheritance passed to descendants'],
      answerIndex: 0,
      answer: 'In heaven, where neither moth nor rust destroys and thieves do not break in',
      reference: 'Matthew 6:20',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Jesus taught: "Lay up for yourselves treasures in heaven, where neither moth nor rust destroys and where thieves do not break in and steal."'
    },
    {
      question: 'What were the Hebrew names of Daniel\'s three companions who were cast into the blazing furnace?',
      options: ['Hananiah, Mishael, and Azariah', 'Belteshazzar, Sheshbazzar, and Zerubbabel', 'Eliezer, Phinehas, and Ithamar', 'Hophni, Phinehas, and Ichabod'],
      answerIndex: 0,
      answer: 'Hananiah, Mishael, and Azariah',
      reference: 'Daniel 1:6-7; Daniel 3',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The Babylonians renamed Hananiah, Mishael, and Azariah to Shadrach, Meshach, and Abednego before they faced the fiery furnace.'
    },
    {
      question: 'Which Roman governor presided over the trial of Jesus and washed his hands before the multitude?',
      options: ['Pontius Pilate', 'Felix', 'Festus', 'Gallio'],
      answerIndex: 0,
      answer: 'Pontius Pilate',
      reference: 'Matthew 27:24',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Pilate took water and washed his hands before the crowd, saying, "I am innocent of this man\'s blood; see to it yourselves."'
    },
    {
      question: 'In Genesis 22, what animal did Abraham find caught in a thicket by its horns to offer in place of his son Isaac?',
      options: ['A ram', 'A bull', 'A goat', 'A young lamb'],
      answerIndex: 0,
      answer: 'A ram',
      reference: 'Genesis 22:13',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Abraham looked and saw a ram caught in a thicket by its horns, and offered it as a burnt offering instead of his son on Mount Moriah.'
    },
    {
      question: 'Who was the first Christian martyr recorded in the Book of Acts who prayed for his executioners as they stoned him?',
      options: ['Stephen', 'James the son of Zebedee', 'Barnabas', 'Silas'],
      answerIndex: 0,
      answer: 'Stephen',
      reference: 'Acts 7:59-60',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'Stephen prayed, "Lord, do not hold this sin against them," as he was stoned to death outside the city.'
    },
    {
      question: 'According to Psalm 23, where does the Good Shepherd make the psalmist lie down, and beside what waters does He lead him?',
      options: ['Green pastures and still waters', 'Rocky peaks and living streams', 'Olive groves and torrential rivers', 'Wilderness valleys and mountain brooks'],
      answerIndex: 0,
      answer: 'Green pastures and still waters',
      reference: 'Psalm 23:2',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Psalm 23:2 states: "He makes me lie down in green pastures. He leads me beside still waters. He restores my soul."'
    },
    {
      question: 'In Luke 19, what kind of tree did Zacchaeus the chief tax collector climb in Jericho in order to see Jesus?',
      options: ['Sycamore fig tree', 'Olive tree', 'Cedar tree', 'Oak tree'],
      answerIndex: 0,
      answer: 'Sycamore fig tree',
      reference: 'Luke 19:4',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Zacchaeus ran ahead and climbed into a sycamore-fig tree to see Jesus, because he was short in stature.'
    },
    {
      question: 'In 1 Kings 17, how did God miraculously feed Elijah at the brook Cherith during the drought?',
      options: ['Ravens brought him bread and meat morning and evening', 'Angels brought him manna daily', 'A widow from Jericho brought him flour', 'Shepherds from Gilead brought him goat milk'],
      answerIndex: 0,
      answer: 'Ravens brought him bread and meat morning and evening',
      reference: '1 Kings 17:6',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'The ravens brought Elijah bread and meat in the morning and evening, and he drank from the brook Cherith.'
    },
    {
      question: 'Which apostle famously doubted the resurrection of Jesus until he saw and touched the nail prints in Jesus\' hands and side?',
      options: ['Thomas', 'Philip', 'Bartholomew', 'Thaddaeus'],
      answerIndex: 0,
      answer: 'Thomas',
      reference: 'John 20:24-28',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Thomas said he would not believe unless he saw the nail marks, but upon seeing Jesus, he confessed: "My Lord and my God!"'
    },
    {
      question: 'According to Proverbs 3:5-6, what must believers do instead of leaning on their own human understanding?',
      options: ['Trust in the Lord with all their heart and acknowledge Him in all their ways', 'Rely on the council of philosophers', 'Seek earthly signs before making decisions', 'Depend primarily on their own intellect and wealth'],
      answerIndex: 0,
      answer: 'Trust in the Lord with all their heart and acknowledge Him in all their ways',
      reference: 'Proverbs 3:5-6',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: '"Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."'
    },
    {
      question: 'What village was the home of Mary, Martha, and Lazarus where Jesus raised Lazarus from the dead?',
      options: ['Bethany', 'Bethlehem', 'Capernaum', 'Nazareth'],
      answerIndex: 0,
      answer: 'Bethany',
      reference: 'John 11:1',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'Lazarus and his sisters Mary and Martha lived in Bethany, about two miles east of Jerusalem.'
    },
    {
      question: 'In Exodus 14, what body of water did the Lord divide with a strong east wind so the Israelites could cross on dry ground?',
      options: ['The Red Sea', 'The Jordan River', 'The Sea of Galilee', 'The Euphrates River'],
      answerIndex: 0,
      answer: 'The Red Sea',
      reference: 'Exodus 14:21-22',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'Moses stretched out his hand over the sea, and the Lord drove back the Red Sea with a strong east wind all night, creating dry ground.'
    },
    {
      question: 'Who anointed both Saul and David as kings of Israel in obedience to the word of the Lord?',
      options: ['Samuel', 'Nathan', 'Gad', 'Ahijah'],
      answerIndex: 0,
      answer: 'Samuel',
      reference: '1 Samuel 10:1; 1 Samuel 16:13',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'The prophet Samuel poured oil over Saul to make him king, and later anointed David from among the sons of Jesse in Bethlehem.'
    },
    {
      question: 'In Acts 2, on what Jewish feast day did the Holy Spirit descend upon the believers in Jerusalem like tongues of fire?',
      options: ['Pentecost', 'Passover', 'Tabernacles (Sukkot)', 'Day of Atonement (Yom Kippur)'],
      answerIndex: 0,
      answer: 'Pentecost',
      reference: 'Acts 2:1-4',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'On the day of Pentecost, the believers were filled with the Holy Spirit and began to speak in other tongues as the Spirit gave utterance.'
    },
    {
      question: 'Which New Testament epistle contains the renowned "Hall of Faith" honoring Abraham, Moses, Rahab, and other ancient believers?',
      options: ['Hebrews (Chapter 11)', 'Romans (Chapter 8)', 'James (Chapter 2)', '1 Peter (Chapter 1)'],
      answerIndex: 0,
      answer: 'Hebrews (Chapter 11)',
      reference: 'Hebrews 11',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'Hebrews 11 is celebrated across Christendom as the "Hall of Faith," recounting the steadfast trust of biblical patriarchs and martyrs.'
    },
    {
      question: 'In 1 Corinthians 13, which three eternal virtues abide, and which one is declared the greatest?',
      options: ['Faith, hope, and love; the greatest of these is love', 'Prayer, fasting, and almsgiving; the greatest is prayer', 'Wisdom, knowledge, and prophecy; the greatest is wisdom', 'Justice, mercy, and humility; the greatest is mercy'],
      answerIndex: 0,
      answer: 'Faith, hope, and love; the greatest of these is love',
      reference: '1 Corinthians 13:13',
      difficulty: 'easy',
      category: 'Epistles',
      explanation: '"So now faith, hope, and love abide, these three; but the greatest of these is love."'
    },
    {
      question: 'What was the name of the garden across the Kidron Valley where Jesus prayed in anguish before His betrayal?',
      options: ['Gethsemane', 'Eden', 'Nain', 'Engedi'],
      answerIndex: 0,
      answer: 'Gethsemane',
      reference: 'Matthew 26:36',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Jesus went with His disciples to Gethsemane on the Mount of Olives and prayed: "Not as I will, but as you will."'
    },
    {
      question: 'Who was the aged priest who mentored young Samuel in the tabernacle at Shiloh?',
      options: ['Eli', 'Phinehas', 'Ahimelech', 'Zadok'],
      answerIndex: 0,
      answer: 'Eli',
      reference: '1 Samuel 3:1-9',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Eli the high priest served at Shiloh and instructed young Samuel how to answer when the Lord called his name: "Speak, Lord, for your servant hears."'
    },
    {
      question: 'In the Book of Revelation, what Greek letters are proclaimed by the Lord God to describe His eternal, sovereign nature?',
      options: ['Alpha and Omega', 'Beta and Zeta', 'Delta and Sigma', 'Chi and Rho'],
      answerIndex: 0,
      answer: 'Alpha and Omega',
      reference: 'Revelation 1:8',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: '"I am the Alpha and the Omega," says the Lord God, "who is and who was and who is to come, the Almighty."'
    }
  ];

  // Fisher-Yates shuffle algorithm to guarantee randomized sets on initial master dataset build
  const shuffled = [...rawQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map((q, idx) => {
    const randomized = shuffleQuestionOptions(q as Question);
    return {
      ...randomized,
      id: idx + 1,
      explanation: q.explanation || `This biblical question examines truth from ${q.category} and scripture reference ${q.reference}.`
    };
  });
};

/**
 * Creates a freshly randomized quiz session dataset:
 * 1. Shuffles the questions with an unbiased Fisher-Yates shuffle so no question repeats within the session.
 * 2. Shuffles answer options (A, B, C, D) for each question, safely preserving correct answer identity.
 * 3. Assigns clean sequential IDs (1..N).
 * 4. Freezes this order for the lifetime of the session so navigating back and forward is rock-solid.
 */
export const createShuffledSessionDataset = (baseDataset: QuizDataset, limit?: number): QuizDataset => {
  const pool = [...baseDataset.questions];
  // Fisher-Yates unbiased shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = limit && limit > 0 ? pool.slice(0, limit) : pool;

  const sessionQuestions: Question[] = selected.map((q, idx) => {
    const randomized = shuffleQuestionOptions(q);
    return {
      ...randomized,
      id: idx + 1,
    };
  });

  return {
    ...baseDataset,
    questions: sessionQuestions,
  };
};

export const masterDataset: QuizDataset = {
  id: 'master-challenge',
  title: 'Ultimate Advanced Bible Challenge',
  description: 'A comprehensive, rigorous theological marathon of historical, prophetic, and gospel scripture challenges.',
  category: 'Full Bible Masterclass',
  questions: generateMasterQuestions()
};

export const genesisDataset: QuizDataset = {
  id: 'genesis-25',
  title: 'Genesis: Foundations of Faith',
  description: 'Explore creation, patriarchs, and covenant history in Genesis.',
  category: 'Old Testament',
  questions: masterDataset.questions.filter(q => q.category === 'Old Testament' || q.category === 'Creation').slice(0, 25)
};

export const newTestamentDataset: QuizDataset = {
  id: 'new-testament-25',
  title: 'New Testament Gospels & Epistles',
  description: 'Test your knowledge of the life of Christ and apostolic letters.',
  category: 'New Testament',
  questions: masterDataset.questions.filter(q => q.category === 'Gospels' || q.category === 'New Testament' || q.category === 'Epistles').slice(0, 25)
};

export const allDatasets: QuizDataset[] = [
  masterDataset,
  testDataset,
  genesisDataset,
  newTestamentDataset
];
