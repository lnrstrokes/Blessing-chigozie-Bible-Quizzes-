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
    }
  ];

  // Fisher-Yates shuffle algorithm to guarantee randomized sets on each run
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
      explanation: q.explanation || `This rigorous question examines key biblical principles from ${q.category} and scripture reference ${q.reference}.`
    };
  });
};

export const masterDataset: QuizDataset = {
  id: 'master-110',
  title: 'Ultimate 110-Question Advanced Bible Challenge',
  description: 'A comprehensive 1-hour rigorous theological marathon progressing through historical and scholarly scripture challenges.',
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
  questions: masterDataset.questions.filter(q => q.category === 'Gospels' || q.category === 'New Testament').slice(0, 25)
};

export const allDatasets: QuizDataset[] = [
  masterDataset,
  testDataset,
  genesisDataset,
  newTestamentDataset
];
