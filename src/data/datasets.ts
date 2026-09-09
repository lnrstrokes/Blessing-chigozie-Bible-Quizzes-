import { QuizDataset, Question } from '../types';

export const testDataset: QuizDataset = {
  id: 'test-10',
  title: 'Quick Bible Test (10 Qs)',
  description: 'A rapid 10-question dataset to test the quiz engine.',
  category: 'Mixed',
  questions: [
    {
      id: 1,
      question: 'Who built the ark according to Genesis?',
      options: ['Moses', 'Noah', 'Abraham', 'David'],
      answerIndex: 1,
      answer: 'Noah',
      reference: 'Genesis 6:14',
      difficulty: 'easy',
      category: 'Old Testament',
      explanation: 'God instructed Noah to build an ark of gopher wood to save his family and animals from the flood.'
    },
    {
      id: 2,
      question: 'What is the first book of the New Testament?',
      options: ['Genesis', 'John', 'Matthew', 'Acts'],
      answerIndex: 2,
      answer: 'Matthew',
      reference: 'Matthew 1:1',
      difficulty: 'easy',
      category: 'New Testament',
      explanation: 'The New Testament opens with the Gospel according to Matthew, tracing Jesus lineage and ministry.'
    },
    {
      id: 3,
      question: 'Who was thrown into a den of lions and protected by God?',
      options: ['Daniel', 'Joseph', 'Elijah', 'Jeremiah'],
      answerIndex: 0,
      answer: 'Daniel',
      reference: 'Daniel 6:16',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Daniel remained faithful to God and was rescued from the hungry lions by an angel.'
    },
    {
      id: 4,
      question: 'In which city was Jesus born?',
      options: ['Nazareth', 'Jerusalem', 'Capernaum', 'Bethlehem'],
      answerIndex: 3,
      answer: 'Bethlehem',
      reference: 'Matthew 2:1',
      difficulty: 'easy',
      category: 'Gospels',
      explanation: 'Jesus was born in Bethlehem of Judea in the days of King Herod.'
    },
    {
      id: 5,
      question: 'How many days and nights did it rain during the flood of Noah?',
      options: ['7 days', '40 days', '100 days', '365 days'],
      answerIndex: 1,
      answer: '40 days',
      reference: 'Genesis 7:12',
      difficulty: 'medium',
      category: 'Old Testament',
      explanation: 'Rain fell upon the earth for forty days and forty nights.'
    },
    {
      id: 6,
      question: 'Who betrayed Jesus for thirty pieces of silver?',
      options: ['Peter', 'Thomas', 'Judas Iscariot', 'Pontius Pilate'],
      answerIndex: 2,
      answer: 'Judas Iscariot',
      reference: 'Matthew 26:15',
      difficulty: 'medium',
      category: 'Gospels',
      explanation: 'Judas Iscariot agreed to hand Jesus over to the chief priests for thirty silver coins.'
    },
    {
      id: 7,
      question: 'What is the shortest verse in the English Bible?',
      options: ['Jesus wept.', 'Rejoice evermore.', 'God is love.', 'Pray without ceasing.'],
      answerIndex: 0,
      answer: 'Jesus wept.',
      reference: 'John 11:35',
      difficulty: 'hard',
      category: 'Gospels',
      explanation: 'Found in the account of Lazarus, John 11:35 is famously the shortest verse.'
    },
    {
      id: 8,
      question: 'Which apostle was a tax collector before following Jesus?',
      options: ['Andrew', 'Matthew', 'James', 'Philip'],
      answerIndex: 1,
      answer: 'Matthew',
      reference: 'Matthew 9:9',
      difficulty: 'hard',
      category: 'New Testament',
      explanation: 'Jesus saw Matthew sitting at the tax collector booth and said to him, "Follow me."'
    },
    {
      id: 9,
      question: 'On which mountain did Moses receive the Ten Commandments?',
      options: ['Mount Ararat', 'Mount Carmel', 'Mount Sinai', 'Mount of Olives'],
      answerIndex: 2,
      answer: 'Mount Sinai',
      reference: 'Exodus 19:20',
      difficulty: 'hard',
      category: 'Old Testament',
      explanation: 'The Lord came down upon Mount Sinai, on the top of the mountain, and called Moses up.'
    },
    {
      id: 10,
      question: 'What is the final book of the Christian Bible?',
      options: ['Jude', 'Hebrews', 'Revelation', 'Malachi'],
      answerIndex: 2,
      answer: 'Revelation',
      reference: 'Revelation 1:1',
      difficulty: 'expert',
      category: 'New Testament',
      explanation: 'The Revelation of Jesus Christ is the concluding prophetic book of scripture.'
    }
  ]
};

// Generate comprehensive master 110 question dataset (fully audited for factual accuracy and canonical precision)
const generateMasterQuestions = (): Question[] => {
  const baseQuestions: Omit<Question, 'id'>[] = [
    // Easy (1-20)
    { question: 'Who built the ark?', options: ['Moses', 'Noah', 'Abraham', 'David'], answerIndex: 1, answer: 'Noah', reference: 'Genesis 6:14', difficulty: 'easy', category: 'Old Testament' },
    { question: 'What is the first book of the Bible?', options: ['Exodus', 'Genesis', 'Leviticus', 'Psalms'], answerIndex: 1, answer: 'Genesis', reference: 'Genesis 1:1', difficulty: 'easy', category: 'Old Testament' },
    { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Job', 'Joshua', 'Joel'], answerIndex: 0, answer: 'Jonah', reference: 'Jonah 1:17', difficulty: 'easy', category: 'Old Testament' },
    { question: 'Where was Jesus born?', options: ['Nazareth', 'Jerusalem', 'Bethlehem', 'Capernaum'], answerIndex: 2, answer: 'Bethlehem', reference: 'Matthew 2:1', difficulty: 'easy', category: 'Gospels' },
    { question: 'How many disciples did Jesus choose?', options: ['7', '10', '12', '40'], answerIndex: 2, answer: '12', reference: 'Matthew 10:1', difficulty: 'easy', category: 'Gospels' },
    { question: 'What did God create on the first day?', options: ['Light', 'Animals', 'Sun and Moon', 'Man'], answerIndex: 0, answer: 'Light', reference: 'Genesis 1:3', difficulty: 'easy', category: 'Creation' },
    { question: 'Who killed Goliath the giant?', options: ['Saul', 'David', 'Samson', 'Solomon'], answerIndex: 1, answer: 'David', reference: '1 Samuel 17:50', difficulty: 'easy', category: 'Old Testament' },
    { question: 'What is the longest book in the Bible?', options: ['Genesis', 'Isaiah', 'Psalms', 'Jeremiah'], answerIndex: 2, answer: 'Psalms', reference: 'Book of Psalms', difficulty: 'easy', category: 'Poetry' },
    { question: 'Who was the mother of Jesus?', options: ['Elizabeth', 'Martha', 'Mary', 'Magdalene'], answerIndex: 2, answer: 'Mary', reference: 'Luke 1:30', difficulty: 'easy', category: 'Gospels' },
    { question: 'What river was Jesus baptized in?', options: ['Jordan River', 'Nile River', 'Euphrates', 'Tigris'], answerIndex: 0, answer: 'Jordan River', reference: 'Matthew 3:13', difficulty: 'easy', category: 'Gospels' },
    { question: 'Who was known as a man after God’s own heart?', options: ['Solomon', 'Saul', 'David', 'Samuel'], answerIndex: 2, answer: 'David', reference: '1 Samuel 13:14', difficulty: 'easy', category: 'Old Testament' },
    { question: 'What food fell from heaven to feed the Israelites?', options: ['Manna', 'Bread', 'Quail', 'Honey'], answerIndex: 0, answer: 'Manna', reference: 'Exodus 16:31', difficulty: 'easy', category: 'Old Testament' },
    { question: 'Who received the Ten Commandments on Mount Sinai?', options: ['Aaron', 'Moses', 'Joshua', 'Caleb'], answerIndex: 1, answer: 'Moses', reference: 'Exodus 20:1', difficulty: 'easy', category: 'Old Testament' },
    { question: 'What is the final book of the New Testament?', options: ['Jude', 'Hebrews', 'Revelation', 'Acts'], answerIndex: 2, answer: 'Revelation', reference: 'Revelation 1:1', difficulty: 'easy', category: 'New Testament' },
    { question: 'Who denied Jesus three times before the rooster crowed?', options: ['John', 'James', 'Peter', 'Judas'], answerIndex: 2, answer: 'Peter', reference: 'Luke 22:61', difficulty: 'easy', category: 'Gospels' },
    { question: 'What spice/gift did the wise men bring alongside gold and frankincense?', options: ['Myrrh', 'Silver', 'Silk', 'Spices'], answerIndex: 0, answer: 'Myrrh', reference: 'Matthew 2:11', difficulty: 'easy', category: 'Gospels' },
    { question: 'Who was sold into slavery by his brothers?', options: ['Benjamin', 'Joseph', 'Reuben', 'Judah'], answerIndex: 1, answer: 'Joseph', reference: 'Genesis 37:28', difficulty: 'easy', category: 'Old Testament' },
    { question: 'What trade or occupation was the Apostle Paul?', options: ['Fisherman', 'Tentmaker', 'Carpenter', 'Shepherd'], answerIndex: 1, answer: 'Tentmaker', reference: 'Acts 18:3', difficulty: 'easy', category: 'New Testament' },
    { question: 'Who was the oldest man mentioned in the Bible?', options: ['Adam', 'Noah', 'Methuselah', 'Enoch'], answerIndex: 2, answer: 'Methuselah', reference: 'Genesis 5:27', difficulty: 'easy', category: 'Old Testament' },
    { question: 'Which Gospel was written by a physician/doctor?', options: ['Matthew', 'Mark', 'Luke', 'John'], answerIndex: 2, answer: 'Luke', reference: 'Colossians 4:14', difficulty: 'easy', category: 'New Testament' },

    // Medium (21-50)
    { question: 'Who interpreted Pharaoh’s dreams about cows and grain?', options: ['Moses', 'Joseph', 'Daniel', 'Aaron'], answerIndex: 1, answer: 'Joseph', reference: 'Genesis 41:25', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What city’s walls collapsed after the people marched around them for seven days?', options: ['Jerusalem', 'Babylon', 'Jericho', 'Ai'], answerIndex: 2, answer: 'Jericho', reference: 'Joshua 6:20', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who was the high priest who presided over the night trial of Jesus?', options: ['Caiaphas', 'Annas', 'Gamaliel', 'Nicodemus'], answerIndex: 0, answer: 'Caiaphas', reference: 'Matthew 26:57', difficulty: 'medium', category: 'Gospels' },
    { question: 'On which mountain did Elijah challenge the prophets of Baal?', options: ['Mount Sinai', 'Mount Carmel', 'Mount Nebo', 'Mount Tabor'], answerIndex: 1, answer: 'Mount Carmel', reference: '1 Kings 18:19', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who anointed David as king of Israel?', options: ['Eli', 'Samuel', 'Nathan', 'Zadok'], answerIndex: 1, answer: 'Samuel', reference: '1 Samuel 16:13', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What was Matthew’s occupation before following Jesus?', options: ['Fisherman', 'Tax collector', 'Pharisee', 'Centurion'], answerIndex: 1, answer: 'Tax collector', reference: 'Matthew 9:9', difficulty: 'medium', category: 'Gospels' },
    { question: 'Whose staff budded, blossomed, and produced almonds to confirm the chosen priesthood?', options: ['Moses', 'Aaron', 'Joshua', 'Phinehas'], answerIndex: 1, answer: 'Aaron', reference: 'Numbers 17:8', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who was thrown into the fiery furnace alongside Shadrach and Meshach?', options: ['Daniel', 'Abednego', 'Ezra', 'Nehemiah'], answerIndex: 1, answer: 'Abednego', reference: 'Daniel 3:23', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Which monarch visited King Solomon to test his wisdom with hard questions?', options: ['Queen Esther', 'Queen of Sheba', 'Queen Jezebel', 'Queen Vashti'], answerIndex: 1, answer: 'Queen of Sheba', reference: '1 Kings 10:1', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who was the first Christian martyr stoned for his faith?', options: ['Stephen', 'James', 'Antipas', 'Philip'], answerIndex: 0, answer: 'Stephen', reference: 'Acts 7:59', difficulty: 'medium', category: 'New Testament' },
    { question: 'What miracle did Jesus perform at the wedding in Cana?', options: ['Walked on water', 'Turned water into wine', 'Healed a blind man', 'Multiplied loaves'], answerIndex: 1, answer: 'Turned water into wine', reference: 'John 2:9', difficulty: 'medium', category: 'Gospels' },
    { question: 'Who was the baby placed in a papyrus basket by the Nile and adopted by Pharaoh’s daughter?', options: ['Moses', 'Aaron', 'Joshua', 'Gideon'], answerIndex: 0, answer: 'Moses', reference: 'Exodus 2:3-10', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What was the name of Abraham’s first son born through Hagar?', options: ['Isaac', 'Ishmael', 'Midian', 'Zimran'], answerIndex: 1, answer: 'Ishmael', reference: 'Genesis 16:15', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who wrote the majority of the epistles in the New Testament?', options: ['Peter', 'John', 'Paul', 'James'], answerIndex: 2, answer: 'Paul', reference: 'New Testament', difficulty: 'medium', category: 'New Testament' },
    { question: 'What physical ailment did blind Bartimaeus suffer from before Jesus healed him?', options: ['Leprosy', 'Blindness', 'Paralysis', 'Deafness'], answerIndex: 1, answer: 'Blindness', reference: 'Mark 10:46', difficulty: 'medium', category: 'Gospels' },
    { question: 'Who was chosen to replace Judas Iscariot as an apostle?', options: ['Barnabas', 'Matthias', 'Silas', 'Timothy'], answerIndex: 1, answer: 'Matthias', reference: 'Acts 1:26', difficulty: 'medium', category: 'New Testament' },
    { question: 'What body of water did the Israelites cross on dry ground during the Exodus?', options: ['Mediterranean Sea', 'Sea of Galilee', 'Red Sea', 'Dead Sea'], answerIndex: 2, answer: 'Red Sea', reference: 'Exodus 14:21', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who was the wicked king of Israel married to Jezebel?', options: ['Ahab', 'Jeroboam', 'Rehoboam', 'Manasseh'], answerIndex: 0, answer: 'Ahab', reference: '1 Kings 16:31', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What prophetic book features a vision of a valley of dry bones coming to life?', options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], answerIndex: 2, answer: 'Ezekiel', reference: 'Ezekiel 37:1', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Who washed his hands declaring himself innocent of Jesus’ blood?', options: ['Herod Antipas', 'Pontius Pilate', 'Caesar Augustus', 'Felix'], answerIndex: 1, answer: 'Pontius Pilate', reference: 'Matthew 27:24', difficulty: 'medium', category: 'Gospels' },
    { question: 'What city was Saul heading toward when he encountered the risen Christ?', options: ['Jerusalem', 'Antioch', 'Damascus', 'Tarsus'], answerIndex: 2, answer: 'Damascus', reference: 'Acts 9:3', difficulty: 'medium', category: 'New Testament' },
    { question: 'Who was the judge renowned for his physical strength associated with his hair?', options: ['Gideon', 'Jephthah', 'Samson', 'Barak'], answerIndex: 2, answer: 'Samson', reference: 'Judges 16:17', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What tree did Zacchaeus climb to see Jesus pass by?', options: ['Fig tree', 'Sycamore tree', 'Olive tree', 'Cedar tree'], answerIndex: 1, answer: 'Sycamore tree', reference: 'Luke 19:4', difficulty: 'medium', category: 'Gospels' },
    { question: 'Who was Ruth’s loyal mother-in-law?', options: ['Orpah', 'Naomi', 'Hannah', 'Abigail'], answerIndex: 1, answer: 'Naomi', reference: 'Ruth 1:3', difficulty: 'medium', category: 'Old Testament' },
    { question: 'Which prophet succeeded Elijah and received a double portion of his spirit?', options: ['Amos', 'Elisha', 'Micah', 'Hosea'], answerIndex: 1, answer: 'Elisha', reference: '2 Kings 2:9', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What is Hebrews Chapter 11 famously known as?', options: ['The Love Chapter', 'The Hall of Faith', 'The Creation Record', 'The Resurrection Chapter'], answerIndex: 1, answer: 'The Hall of Faith', reference: 'Hebrews 11:1', difficulty: 'medium', category: 'New Testament' },
    { question: 'Who was king when Daniel was thrown into the lions’ den?', options: ['Nebuchadnezzar', 'Darius the Mede', 'Belshazzar', 'Cyrus'], answerIndex: 1, answer: 'Darius the Mede', reference: 'Daniel 6:1', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What was the name of the garden where Jesus prayed in agony before his arrest?', options: ['Eden', 'Gethsemane', 'Gethsemane Garden', 'Garden of Olives'], answerIndex: 1, answer: 'Gethsemane', reference: 'Matthew 26:36', difficulty: 'medium', category: 'Gospels' },
    { question: 'Who was the faithful priest who mentored young Samuel at Shiloh?', options: ['Eli', 'Zadok', 'Ahimelech', 'Abiathar'], answerIndex: 0, answer: 'Eli', reference: '1 Samuel 1:9', difficulty: 'medium', category: 'Old Testament' },
    { question: 'What language was the majority of the Old Testament originally written in?', options: ['Greek', 'Aramaic', 'Hebrew', 'Latin'], answerIndex: 2, answer: 'Hebrew', reference: 'Old Testament Languages', difficulty: 'medium', category: 'Old Testament' },

    // Hard (51-80)
    { question: 'Which king of Judah had his life miraculously extended by 15 years in response to prayer?', options: ['Hezekiah', 'Josiah', 'Uzziah', 'Jotham'], answerIndex: 0, answer: 'Hezekiah', reference: '2 Kings 20:6', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What was the name of Abraham’s chief servant from Damascus who sought a wife for Isaac?', options: ['Eliezer', 'Haran', 'Lot', 'Abimelech'], answerIndex: 0, answer: 'Eliezer', reference: 'Genesis 15:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'In whose house in Joppa did Peter stay when he had the vision of the sheet descending?', options: ['Simon the Tanner', 'Cornelius', 'Tabitha', 'Lydia'], answerIndex: 0, answer: 'Simon the Tanner', reference: 'Acts 9:43', difficulty: 'hard', category: 'New Testament' },
    { question: 'Which minor prophet was a shepherd from Tekoa who preached against social injustice?', options: ['Amos', 'Joel', 'Obadiah', 'Habakkuk'], answerIndex: 0, answer: 'Amos', reference: 'Amos 1:1', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What was the alternative name of Moses’s father-in-law Jethro?', options: ['Reuel', 'Hobab', 'Balak', 'Achish'], answerIndex: 0, answer: 'Reuel', reference: 'Exodus 2:18', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Which king of Babylon besieged and destroyed Jerusalem and the temple in 586 BC?', options: ['Sennacherib', 'Nebuchadnezzar', 'Cyrus', 'Belshazzar'], answerIndex: 1, answer: 'Nebuchadnezzar', reference: '2 Kings 25:8', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the mother of King Solomon?', options: ['Abigail', 'Bathsheba', 'Maacah', 'Haggith'], answerIndex: 1, answer: 'Bathsheba', reference: '2 Samuel 12:24', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What island was the Apostle John exiled to when he received the Revelation?', options: ['Crete', 'Malta', 'Patmos', 'Cyprus'], answerIndex: 2, answer: 'Patmos', reference: 'Revelation 1:9', difficulty: 'hard', category: 'New Testament' },
    { question: 'Who was the artisan filled with the Spirit of God to oversee the tabernacle construction?', options: ['Oholiab', 'Bezalel', 'Ahisamach', 'Hur'], answerIndex: 1, answer: 'Bezalel', reference: 'Exodus 31:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Which canonical book contains no explicit mention of the name of God?', options: ['Job', 'Esther', 'Song of Solomon', 'Ecclesiastes'], answerIndex: 1, answer: 'Esther', reference: 'Book of Esther', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the Roman centurion in Caesarea whose household received the Holy Spirit after Peter preached?', options: ['Julius', 'Cornelius', 'Longinus', 'Cornelius the Centurion'], answerIndex: 1, answer: 'Cornelius', reference: 'Acts 10:1', difficulty: 'hard', category: 'New Testament' },
    { question: 'What was the name of the king of Salem and priest of God Most High who blessed Abraham?', options: ['Abimelech', 'Melchizedek', 'Pharaoh', 'Balaam'], answerIndex: 1, answer: 'Melchizedek', reference: 'Genesis 14:18', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the queen who risked her life to intercede for the Jewish people before King Ahasuerus?', options: ['Vashti', 'Esther', 'Abigail', 'Ruth'], answerIndex: 1, answer: 'Esther', reference: 'Esther 4:16', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What was the name of the pool where Jesus told the blind man to wash his eyes?', options: ['Pool of Bethesda', 'Pool of Siloam', 'Pool of Samaria', 'King’s Pool'], answerIndex: 1, answer: 'Pool of Siloam', reference: 'John 9:7', difficulty: 'hard', category: 'Gospels' },
    { question: 'Which prophet married a woman named Gomer as a living parable of spiritual unfaithfulness?', options: ['Hosea', 'Amos', 'Micah', 'Zephaniah'], answerIndex: 0, answer: 'Hosea', reference: 'Hosea 1:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who accompanied Paul and Barnabas on their first missionary journey as their helper?', options: ['Silas', 'John Mark', 'Timothy', 'Luke'], answerIndex: 1, answer: 'John Mark', reference: 'Acts 13:5', difficulty: 'hard', category: 'New Testament' },
    { question: 'What precious metal was used to overlay the Ark of the Covenant inside and out?', options: ['Silver', 'Bronze', 'Gold', 'Brass'], answerIndex: 2, answer: 'Gold', reference: 'Exodus 25:11', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the king of Moab who hired Balaam to curse the wandering Israelites?', options: ['Sihon', 'Og', 'Balak', 'Eglon'], answerIndex: 2, answer: 'Balak', reference: 'Numbers 22:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What was the name of Naomi’s husband who died in Moab during the famine?', options: ['Mahlon', 'Elimelech', 'Chilion', 'Boaz'], answerIndex: 1, answer: 'Elimelech', reference: 'Ruth 1:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the skilled scribe who returned to Jerusalem to teach God’s law in Ezra 7?', options: ['Nehemiah', 'Ezra', 'Zerubbabel', 'Jeshua'], answerIndex: 1, answer: 'Ezra', reference: 'Ezra 7:6', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Which prophet had a vision of four living creatures and wheels within wheels by the river Kebar?', options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], answerIndex: 2, answer: 'Ezekiel', reference: 'Ezekiel 1:16', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the seller of purple cloth from Thyatira whose heart the Lord opened in Philippi?', options: ['Priscilla', 'Lydia', 'Damaris', 'Phoebe'], answerIndex: 1, answer: 'Lydia', reference: 'Acts 16:14', difficulty: 'hard', category: 'New Testament' },
    { question: 'What valley was the site of the miraculous victory of Jehoshaphat over Moab and Ammon?', options: ['Valley of Elah', 'Valley of Beracah', 'Valley of Achor', 'Valley of Siddim'], answerIndex: 1, answer: 'Valley of Beracah', reference: '2 Chronicles 20:26', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the father of John the Baptist?', options: ['Simeon', 'Zechariah', 'Joseph', 'Theophilus'], answerIndex: 1, answer: 'Zechariah', reference: 'Luke 1:13', difficulty: 'hard', category: 'Gospels' },
    { question: 'Which tribe of Israel received no territorial land inheritance because the Lord was their inheritance?', options: ['Judah', 'Levi', 'Benjamin', 'Dan'], answerIndex: 1, answer: 'Levi', reference: 'Joshua 13:33', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the Persian king who issued the decree allowing the Jewish exiles to return and rebuild the temple?', options: ['Darius', 'Xerxes', 'Cyrus the Great', 'Artaxerxes'], answerIndex: 2, answer: 'Cyrus the Great', reference: '2 Chronicles 36:23', difficulty: 'hard', category: 'Old Testament' },
    { question: 'What mountain range/peak was the site of Moses’ death after viewing the Promised Land?', options: ['Mount Sinai', 'Mount Nebo', 'Mount Hor', 'Mount Gerizim'], answerIndex: 1, answer: 'Mount Nebo', reference: 'Deuteronomy 34:1', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the companion of Paul imprisoned with him in Philippi when an earthquake shook the prison?', options: ['Barnabas', 'Silas', 'Timothy', 'Titus'], answerIndex: 1, answer: 'Silas', reference: 'Acts 16:25', difficulty: 'hard', category: 'New Testament' },
    { question: 'What prophet explicitly foretold that the Messiah would be born in Bethlehem Ephrathah?', options: ['Isaiah', 'Jeremiah', 'Micah', 'Amos'], answerIndex: 2, answer: 'Micah', reference: 'Micah 5:2', difficulty: 'hard', category: 'Old Testament' },
    { question: 'Who was the mother of Samuel the prophet?', options: ['Peninnah', 'Hannah', 'Abigail', 'Michal'], answerIndex: 1, answer: 'Hannah', reference: '1 Samuel 1:20', difficulty: 'hard', category: 'Old Testament' },

    // Very Hard (81-100)
    { question: 'What was the name of Abraham’s later wife/concubine who bore him Zimran, Jokshan, and Midian?', options: ['Hagar', 'Keturah', 'Milcah', 'Rephidim'], answerIndex: 1, answer: 'Keturah', reference: 'Genesis 25:1', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Who was the king of Bashan defeated by Israel at Edrei, noted for his gigantic iron bed?', options: ['Sihon', 'Og', 'Agag', 'King Og of Bashan'], answerIndex: 1, answer: 'Og', reference: 'Deuteronomy 3:11', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'In the Book of Revelation, what is the name of the fallen star that made a third of the waters bitter?', options: ['Abaddon', 'Wormwood', 'Lucifer', 'Belial'], answerIndex: 1, answer: 'Wormwood', reference: 'Revelation 8:10', difficulty: 'very_hard', category: 'New Testament' },
    { question: 'Who was Oholiab’s father, associated with him in crafting the tabernacle?', options: ['Ahisamach', 'Oholiab', 'Hur', 'Uri'], answerIndex: 0, answer: 'Ahisamach', reference: 'Exodus 35:34', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the annual weight of gold received by King Solomon in talents, excluding merchant revenue?', options: ['400 talents', '666 talents', '1000 talents', '500 talents'], answerIndex: 1, answer: '666 talents', reference: '1 Kings 10:14', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Which prophet confronted King David with the parable of the rich man and the ewe lamb?', options: ['Gad', 'Nathan', 'Iddo', 'Ahijah'], answerIndex: 1, answer: 'Nathan', reference: '2 Samuel 12:7', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the name of the valley where Joshua commanded the sun and moon to stand still?', options: ['Valley of Elah', 'Valley of Aijalon', 'Valley of Gibeon', 'Valley of Siddim'], answerIndex: 1, answer: 'Valley of Aijalon', reference: 'Joshua 10:12', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Who was the mother of King Hezekiah of Judah?', options: ['Athaliah', 'Abijah', 'Hamutal', 'Zibiah'], answerIndex: 1, answer: 'Abijah', reference: '2 Kings 18:2', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Which Levite clan was entrusted with the direct transport of the holiest tabernacle furnishings under Kohath?', options: ['Gershonites', 'Merarites', 'Kohathites', 'Korahites'], answerIndex: 2, answer: 'Kohathites', reference: 'Numbers 4:15', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the name of the Egyptian city where Jeremiah and the remnant Jews fled against God’s warning?', options: ['Memphis', 'Tahpanhes', 'Thebes', 'Migdol'], answerIndex: 1, answer: 'Tahpanhes', reference: 'Jeremiah 43:7', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Who was the high priest who assisted child-king Joash in repairing the temple and covenant renewal?', options: ['Jehoiada', 'Uriah', 'Azariah', 'Hilchiah'], answerIndex: 0, answer: 'Jehoiada', reference: '2 Chronicles 24:6', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'In Galatians 4, what mountain in Arabia does Paul use as an allegorical counterpart to the present Jerusalem?', options: ['Mount Sinai', 'Mount Horeb', 'Mount Seir', 'Mount Paran'], answerIndex: 0, answer: 'Mount Sinai', reference: 'Galatians 4:25', difficulty: 'very_hard', category: 'New Testament' },
    { question: 'What was the name of the Philistine idol in Ashdod that miraculously fell face down before the Ark?', options: ['Baal', 'Dagon', 'Ashtoreth', 'Milcom'], answerIndex: 1, answer: 'Dagon', reference: '1 Samuel 5:3', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Which prophet tore his new garment into twelve pieces to symbolize the division of Solomon’s kingdom?', options: ['Ahijah the Shilonite', 'Shemaiah', 'Jehu son of Hanani', 'Micaiah'], answerIndex: 0, answer: 'Ahijah the Shilonite', reference: '1 Kings 11:30', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the name of the brave woman who drove a tent peg through the temple of Sisera?', options: ['Deborah', 'Jael', 'Huldah', 'Abigail'], answerIndex: 1, answer: 'Jael', reference: 'Judges 4:21', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Which king of Judah was struck with leprosy for burning incense on the altar in the temple?', options: ['Uzziah', 'Jotham', 'Ahaz', 'Manasseh'], answerIndex: 0, answer: 'Uzziah', reference: '2 Chronicles 26:19', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the name of the Syrian commander healed of leprosy by washing seven times in the Jordan?', options: ['Hazael', 'Naaman', 'Ben-Hadad', 'Rezin'], answerIndex: 1, answer: 'Naaman', reference: '2 Kings 5:14', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Who was the faithful scribe who wrote Jeremiah’s dictated prophecies on a scroll?', options: ['Baruch', 'Neriah', 'Seraiah', 'Gemariah'], answerIndex: 0, answer: 'Baruch', reference: 'Jeremiah 36:4', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'What was the name of the coastal port city from which Jonah boarded a ship fleeing to Tarshish?', options: ['Caesarea', 'Joppa', 'Tyre', 'Sidon'], answerIndex: 1, answer: 'Joppa', reference: 'Jonah 1:3', difficulty: 'very_hard', category: 'Old Testament' },
    { question: 'Who was the elderly prophetess who gave thanks to God and spoke about Jesus to all awaiting redemption in the temple?', options: ['Anna', 'Elizabeth', 'Huldah', 'Deborah'], answerIndex: 0, answer: 'Anna', reference: 'Luke 2:36', difficulty: 'very_hard', category: 'New Testament' },

    // Expert (101-110)
    { question: 'In Ezekiel 1, what are the four living creature faces representing divine sovereignty and creation?', options: ['Lion, Ox, Man, Eagle', 'Lion, Bear, Leopard, Eagle', 'Bull, Eagle, Man, Lion', 'Lion, Ox, Calf, Eagle'], answerIndex: 0, answer: 'Lion, Ox, Man, Eagle', reference: 'Ezekiel 1:10', difficulty: 'expert', category: 'Old Testament' },
    { question: 'What was the Aramaic name given to the potter’s field purchased with Judas’s returned betrayal money?', options: ['Akeldama', 'Golgatha', 'Gabbatha', 'Aceldama'], answerIndex: 0, answer: 'Akeldama', reference: 'Acts 1:19', difficulty: 'expert', category: 'New Testament' },
    { question: 'Which king of Judah smashed the bronze serpent Nehushtan because the Israelites were offering incense to it?', options: ['Hezekiah', 'Josiah', 'Asa', 'Jehoshaphat'], answerIndex: 0, answer: 'Hezekiah', reference: '2 Kings 18:4', difficulty: 'expert', category: 'Old Testament' },
    { question: 'What was the height in cubits of the golden image set up by Nebuchadnezzar in the plain of Dura?', options: ['60 cubits', '30 cubits', '100 cubits', '50 cubits'], answerIndex: 0, answer: '60 cubits', reference: 'Daniel 3:1', difficulty: 'expert', category: 'Old Testament' },
    { question: 'According to 1 Chronicles 8, who is listed among the early ancestral lineage of King Saul through Kish and Ner?', options: ['Abiel', 'Matri', 'Kish', 'Baal'], answerIndex: 0, answer: 'Abiel', reference: '1 Chronicles 8:33', difficulty: 'expert', category: 'Old Testament' },
    { question: 'According to the Book of Leviticus, which of the following animals was classified as chewing the cud but lacking divided hooves, making it unclean?', options: ['Camel', 'Pig', 'Rabbit', 'Badger'], answerIndex: 0, answer: 'Camel', reference: 'Leviticus 11:4', difficulty: 'expert', category: 'Old Testament' },
    { question: 'Which minor prophet pronounces woes upon Nineveh, describing it as a city of bloodshed full of lies and plunder?', options: ['Nahum', 'Habakkuk', 'Zephaniah', 'Obadiah'], answerIndex: 0, answer: 'Nahum', reference: 'Nahum 3:1', difficulty: 'expert', category: 'Old Testament' },
    { question: 'In Paul’s defense before King Agrippa in Acts 26, what specific proverbial phrase did Jesus speak to him in Hebrew?', options: ['It is hard for you to kick against the goads', 'Saul, Saul, why do you persecute me', 'I am Jesus whom you are persecuting', 'Arise and go into the city'], answerIndex: 0, answer: 'It is hard for you to kick against the goads', reference: 'Acts 26:14', difficulty: 'expert', category: 'New Testament' },
    { question: 'What was the name of the valley south of Jerusalem where child sacrifice to Molech took place, later becoming a symbol of eternal judgment?', options: ['Valley of Hinnom', 'Valley of Elah', 'Kidron Valley', 'Tyropoeon Valley'], answerIndex: 0, answer: 'Valley of Hinnom', reference: 'Jeremiah 19:2', difficulty: 'expert', category: 'Old Testament' },
    { question: 'In the Book of Revelation, which church in Asia Minor is rebuked for being neither cold nor hot, but lukewarm?', options: ['Laodicea', 'Sardis', 'Philadelphia', 'Thyatira'], answerIndex: 0, answer: 'Laodicea', reference: 'Revelation 3:15-16', difficulty: 'expert', category: 'New Testament' },
  ];

  return baseQuestions.map((q, idx) => ({
    ...q,
    id: idx + 1,
    explanation: q.explanation || `This question explores key themes from ${q.category} and highlights foundational scriptural truth found in ${q.reference}.`
  }));
};

export const masterDataset: QuizDataset = {
  id: 'master-110',
  title: 'Ultimate 110-Question Bible Challenge',
  description: 'A comprehensive 1-hour epic Bible quiz progressing from Genesis to Revelation across 5 difficulty levels.',
  category: 'Full Bible Masterclass',
  questions: generateMasterQuestions()
};

export const genesisDataset: QuizDataset = {
  id: 'genesis-25',
  title: 'Genesis: Foundations of Faith',
  description: 'Explore creation, the patriarchs, the flood, and the early covenant in Genesis.',
  category: 'Old Testament',
  questions: masterDataset.questions.filter(q => q.category === 'Old Testament' || q.category === 'Creation').slice(0, 25)
};

export const newTestamentDataset: QuizDataset = {
  id: 'new-testament-25',
  title: 'New Testament Gospels & Epistles',
  description: 'Test your knowledge of the life of Christ, the early church, and apostolic teachings.',
  category: 'New Testament',
  questions: masterDataset.questions.filter(q => q.category === 'Gospels' || q.category === 'New Testament').slice(0, 25)
};

export const allDatasets: QuizDataset[] = [
  masterDataset,
  testDataset,
  genesisDataset,
  newTestamentDataset
];
