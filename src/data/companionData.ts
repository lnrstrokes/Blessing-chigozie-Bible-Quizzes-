import { CompanionCategory, CompanionScenario, CompanionStep } from '../types';

export const companionTaxonomy: CompanionCategory[] = [
  {
    id: 'fear-and-anxiety',
    name: 'Fear & Anxiety',
    description: 'Biblical peace and assurance when dread, anxiety, or panic threaten your heart.',
    scenarios: [
      {
        id: 'fear-when-afraid',
        categoryId: 'fear-and-anxiety',
        categoryName: 'Fear & Anxiety',
        situation: 'WHEN YOU FEEL AFRAID',
        supportingStatement: "What if you don't have to know tomorrow to trust God today?",
        choicePrompt: {
          question: 'WHAT DO YOU NEED MOST RIGHT NOW?',
          options: [
            { key: 'A', label: 'PEACE FOR MY MIND' },
            { key: 'B', label: 'COURAGE TO FACE TODAY' },
            { key: 'C', label: 'WISDOM FOR A DECISION' },
            { key: 'D', label: 'STRENGTH TO ENDURE' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Joshua 1:9',
        primaryText: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
        keyPhraseEmphasis: 'for the Lord your God will be with you wherever you go',
        supportingReferences: ['Isaiah 41:10', 'Psalm 56:3', '2 Timothy 1:7'],
        connectionPoints: [
          'You may not know what tomorrow holds.',
          'But uncertainty does not mean you are without direction.',
          'Scripture calls you to trust God with what you cannot yet see.',
        ],
        reflectionQuestion: "What are you carrying today because you're afraid of what might happen tomorrow?",
        responsePrompt: {
          question: 'WHAT WILL YOU DO WITH THIS WORD?',
          options: [
            { key: 'A', label: 'PRAY ABOUT IT' },
            { key: 'B', label: 'TRUST GOD WITH IT' },
            { key: 'C', label: 'WAIT WITHOUT GIVING UP' },
            { key: 'D', label: 'SHARE IT WITH SOMEONE' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, when fear tries to convince me I am alone, anchor my heart in Your presence. Give me courage to take the next step in faith, trusting You with everything I cannot control. In Jesus\' name, Amen.',
        takeaway: "You don't need tomorrow's answers to trust God today.",
        nextSituationPreview: 'WHEN YOU FEEL LIKE GIVING UP',
      },
      {
        id: 'fear-fear-of-future',
        categoryId: 'fear-and-anxiety',
        categoryName: 'Fear & Anxiety',
        situation: 'FEAR OF THE FUTURE',
        supportingStatement: 'When dread of what might happen paralyzes your ability to live in today.',
        choicePrompt: {
          question: 'WHAT IS YOUR GREATEST UNCERTAINTY TODAY?',
          options: [
            { key: 'A', label: 'FINANCIAL PROVISION' },
            { key: 'B', label: 'FAMILY OR HEALTH' },
            { key: 'C', label: 'CAREER DIRECTION' },
            { key: 'D', label: 'AN UNKNOWN OUTCOME' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Isaiah 41:10',
        primaryText: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.',
        keyPhraseEmphasis: 'I will uphold you with my righteous right hand',
        supportingReferences: ['Matthew 6:34', 'Proverbs 3:5-6'],
        connectionPoints: [
          'God does not command us not to fear in isolation.',
          'He anchors our confidence in His unchanging character.',
          'His righteous hand is stronger than any storm ahead of you.',
        ],
        reflectionQuestion: 'If God already holds your future, what burden can you lay down right now?',
        responsePrompt: {
          question: 'WHAT DECLARATION OF FAITH WILL YOU MAKE TODAY?',
          options: [
            { key: 'A', label: 'GOD IS ALREADY IN MY TOMORROW' },
            { key: 'B', label: 'I REFUSE TO BE RULED BY PANIC' },
            { key: 'C', label: 'HIS PEACE GUARDS MY HEART' },
            { key: 'D', label: 'I WILL REST IN HIS PROVIDENCE' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Father, forgive me for rehearsing worst-case scenarios instead of remembering Your faithfulness. I entrust my future, my family, and my tomorrow into Your righteous hands. In Jesus\' name, Amen.',
        takeaway: 'Your future is not at the mercy of chance; it is secured by the Sovereign God.',
        nextSituationPreview: 'WHEN GRIEF BREAKS YOUR HEART',
      },
      {
        id: 'fear-racing-thoughts',
        categoryId: 'fear-and-anxiety',
        categoryName: 'Fear & Anxiety',
        situation: 'WHEN WORRY OVERWHELMS YOUR MIND',
        supportingStatement: 'When racing thoughts consume your peace and stress feels too heavy to carry.',
        choicePrompt: {
          question: 'WHEN DOES WORRY HIT YOU HARDEST?',
          options: [
            { key: 'A', label: 'LATE AT NIGHT' },
            { key: 'B', label: 'FIRST THING IN THE MORNING' },
            { key: 'C', label: 'DURING WORK HOURS' },
            { key: 'D', label: 'WHEN BAD NEWS ARRIVES' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Philippians 4:6-7',
        primaryText: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.',
        keyPhraseEmphasis: 'the peace of God, which surpasses all understanding, will guard your hearts',
        supportingReferences: ['1 Peter 5:7', 'Psalm 94:19'],
        connectionPoints: [
          'God does not ask you to deny your worries.',
          'He invites you to convert them into deliberate prayers.',
          'His peace acts as an armed guard over your heart and mind.',
        ],
        reflectionQuestion: 'Can you name one anxiety right now that you will turn into a prayer of thanksgiving?',
        responsePrompt: {
          question: 'HOW WILL YOU RESPOND TO RACING THOUGHTS?',
          options: [
            { key: 'A', label: 'TURN WORRY INTO IMMEDIATE PRAYER' },
            { key: 'B', label: 'SPEAK SCRIPTURE OUT LOUD' },
            { key: 'C', label: 'WRITE DOWN MY BLESSINGS' },
            { key: 'D', label: 'REST IN GOD\'S QUIET PRESENCE' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, I cast all my racing anxieties upon You because You care for me. Replace panic with supernatural peace that defies human comprehension. In Jesus\' name, Amen.',
        takeaway: 'When worry enters your heart, turn it into prayer before it turns into panic.',
        nextSituationPreview: 'WHEN YOU FEEL AFRAID',
      },
    ],
  },
  {
    id: 'discouragement',
    name: 'Discouragement',
    description: 'Renewing strength and hope when weariness, failure, or exhaustion set in.',
    scenarios: [
      {
        id: 'discouragement-weary-in-doing-good',
        categoryId: 'discouragement',
        categoryName: 'Discouragement',
        situation: 'WHEN YOU FEEL LIKE GIVING UP',
        supportingStatement: 'When your efforts seem fruitless and you feel too exhausted to take another step.',
        choicePrompt: {
          question: 'WHAT AREA FEELS MOST DRAINING RIGHT NOW?',
          options: [
            { key: 'A', label: 'A SLOW WORK BREAKTHROUGH' },
            { key: 'B', label: 'A STRAINED RELATIONSHIP' },
            { key: 'C', label: 'A PERSONAL HEALTH BATTLE' },
            { key: 'D', label: 'SPIRITUAL DRYNESS' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Galatians 6:9',
        primaryText: 'And let us not grow weary of doing good, for in due season we will reap, if we do not give up.',
        keyPhraseEmphasis: 'for in due season we will reap, if we do not give up',
        supportingReferences: ['Isaiah 40:31', 'Hebrews 12:1-2'],
        connectionPoints: [
          'Between sowing seeds and seeing a harvest is always a hidden season of waiting.',
          'Fatigue does not mean failure; it means you need God\'s replenishment.',
          'Your labor in the Lord is never wasted.',
        ],
        reflectionQuestion: 'Where have you felt most tempted to quit, and what would trusting God for one more day look like?',
        responsePrompt: {
          question: 'WHAT COMMITMENT WILL YOU MAKE TO GOD TODAY?',
          options: [
            { key: 'A', label: 'TAKE ONE MORE FAITHFUL STEP' },
            { key: 'B', label: 'REST DEEPLY IN HIS STRENGTH' },
            { key: 'C', label: 'STOP SPREADING MYSELF THIN' },
            { key: 'D', label: 'SEEK GODLY ENCOURAGEMENT' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Father, replenish my weary spirit. When no progress is visible, help me believe in Your invisible harvest. Keep my hands faithful and my heart soft. In Jesus\' name, Amen.',
        takeaway: "Don't quit in the seed stage; God's harvest is never late.",
        nextSituationPreview: 'WHEN YOU NEED WISDOM FOR A DECISION',
      },
    ],
  },
  {
    id: 'loneliness',
    name: 'Loneliness',
    description: 'Divine companionship and abiding fellowship when feeling isolated or forgotten.',
    scenarios: [
      {
        id: 'loneliness-feeling-forgotten',
        categoryId: 'loneliness',
        categoryName: 'Loneliness',
        situation: 'WHEN YOU FEEL COMPLETELY ALONE',
        supportingStatement: 'Even in a crowded room or digital world, an aching sense of being unseen.',
        choicePrompt: {
          question: 'WHAT KIND OF LONELINESS HURTS MOST?',
          options: [
            { key: 'A', label: 'BEING MISUNDERSTOOD' },
            { key: 'B', label: 'PHYSICAL ISOLATION' },
            { key: 'C', label: 'FEELING FORGOTTEN BY PEERS' },
            { key: 'D', label: 'NO ONE TO SHARE BURDENS WITH' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Hebrews 13:5',
        primaryText: 'Keep your life free from love of money, and be content with what you have, for he has said, "I will never leave you nor forsake you."',
        keyPhraseEmphasis: 'I will never leave you nor forsake you',
        supportingReferences: ['Psalm 139:7-10', 'Matthew 28:20'],
        connectionPoints: [
          'Human presence can fluctuate with seasons and circumstances.',
          'God\'s presence is an eternal, unbreakable covenant promise.',
          'You are known completely, loved unconditionally, and never abandoned.',
        ],
        reflectionQuestion: 'How changes your outlook to know Jesus is closer to you than the air you breathe?',
        responsePrompt: {
          question: 'HOW WILL YOU DRAW NEAR TO HIM TODAY?',
          options: [
            { key: 'A', label: 'POUR OUT MY HEART IN HONEST PRAYER' },
            { key: 'B', label: 'WORSHIP PRIVATELY IN FAITH' },
            { key: 'C', label: 'REACH OUT TO ENCOURAGE SOMEONE ELSE' },
            { key: 'D', label: 'MEDITATE ON PSALM 139' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Precious Lord Jesus, thank You that You never walk away. Quiet the ache of loneliness with the reality of Your abiding Spirit. You are my true Companion. In Jesus\' name, Amen.',
        takeaway: 'You are never truly alone when the omnipresent God calls you His own.',
        nextSituationPreview: 'RUNNING ON EMPTY',
      },
    ],
  },
  {
    id: 'grief-and-loss',
    name: 'Grief & Loss',
    description: 'Tender comfort and sacred healing for shattered hearts and profound sorrow.',
    scenarios: [
      {
        id: 'grief-brokenhearted',
        categoryId: 'grief-and-loss',
        categoryName: 'Grief & Loss',
        situation: 'WHEN GRIEF BREAKS YOUR HEART',
        supportingStatement: 'When sorrow feels suffocating and pain leaves no words to pray.',
        choicePrompt: {
          question: 'WHERE DO YOU NEED GOD\'S COMFORT TODAY?',
          options: [
            { key: 'A', label: 'LOSS OF A LOVED ONE' },
            { key: 'B', label: 'A BROKEN DREAM OR RELATIONSHIP' },
            { key: 'C', label: 'UNEXPECTED HARDSHIP' },
            { key: 'D', label: 'DEEP EMOTIONAL PAIN' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Psalm 34:18',
        primaryText: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
        keyPhraseEmphasis: 'The Lord is close to the brokenhearted',
        supportingReferences: ['Matthew 5:4', 'Revelation 21:4'],
        connectionPoints: [
          'God does not pull back when your heart is in pieces.',
          'He draws nearest precisely at the place of your deepest wound.',
          'Your tears are neither ignored nor forgotten by Him.',
        ],
        reflectionQuestion: 'Can you bring your unedited grief before the God who bottles every tear?',
        responsePrompt: {
          question: 'WHAT PRAYER DO YOU CRY OUT IN YOUR HEART?',
          options: [
            { key: 'A', label: 'HOLD ME CLOSE, LORD' },
            { key: 'B', label: 'HEAL MY BROKEN HEART' },
            { key: 'C', label: 'GIVE ME STRENGTH FOR TODAY' },
            { key: 'D', label: 'RESTORE MY HOPE IN YOU' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Father of all mercies, draw near to my broken heart. Hold me in the quiet moments when the ache is sharp. Be the healer of my soul. In Jesus\' name, Amen.',
        takeaway: "God does not distance Himself from your grief; He draws nearest when you're crushed.",
        nextSituationPreview: 'WHEN ANGER BURNS INSIDE',
      },
    ],
  },
  {
    id: 'anger-and-conflict',
    name: 'Anger & Conflict',
    description: 'Meekness, righteous restraint, and relational peace in volatile situations.',
    scenarios: [
      {
        id: 'anger-struggling-with-bitterness',
        categoryId: 'anger-and-conflict',
        categoryName: 'Anger & Conflict',
        situation: 'WHEN ANGER BURNS INSIDE',
        supportingStatement: 'When offense and mistreatment tempt you to lash out or harbor bitter resentment.',
        choicePrompt: {
          question: 'WHAT IS TEMPTING YOUR ANGER RIGHT NOW?',
          options: [
            { key: 'A', label: 'BEING UNFAIRLY ACCUSED' },
            { key: 'B', label: 'DISRESPECT OR BETRAYAL' },
            { key: 'C', label: 'UNMET EXPECTATIONS' },
            { key: 'D', label: 'FRUSTRATION AT CIRCUMSTANCES' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'James 1:19-20',
        primaryText: 'My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.',
        keyPhraseEmphasis: 'quick to listen, slow to speak and slow to become angry',
        supportingReferences: ['Proverbs 15:1', 'Ephesians 4:26-27'],
        connectionPoints: [
          'Anger feels like control, but unchecked anger controls you.',
          'Godly restraint is strength under the Holy Spirit\'s discipline.',
          'Giving your anger to God frees you from carrying toxic poison.',
        ],
        reflectionQuestion: 'Who do you need to release to God\'s justice rather than taking vengeance yourself?',
        responsePrompt: {
          question: 'WHAT STEP OF PEACE WILL YOU CHOOSE TODAY?',
          options: [
            { key: 'A', label: 'CHOOSE SILENCE OVER BITING WORDS' },
            { key: 'B', label: 'FORGIVE AS CHRIST FORGAVE ME' },
            { key: 'C', label: 'WALK AWAY AND COOL DOWN' },
            { key: 'D', label: 'PRAY BLESSING OVER MY OFFENDER' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Holy Spirit, tame my tongue and guard my temper. Cleanse my heart of bitterness and give me Christlike restraint and humility. In Jesus\' name, Amen.',
        takeaway: 'Holding onto anger hurts the one carrying it more than the one who caused it.',
        nextSituationPreview: 'WHEN PLANS HAVE SUDDENLY CHANGED',
      },
    ],
  },
  {
    id: 'guilt-and-forgiveness',
    name: 'Guilt & Forgiveness',
    description: 'The freedom of redemption, unmerited grace, and a cleansed conscience.',
    scenarios: [
      {
        id: 'guilt-condemnation',
        categoryId: 'guilt-and-forgiveness',
        categoryName: 'Guilt & Forgiveness',
        situation: 'WHEN GUILT CONDEMNS YOU',
        supportingStatement: 'When past mistakes and self-reproach whisper that you are disqualified from grace.',
        choicePrompt: {
          question: 'WHAT CONDEMNING THOUGHT SOUGHT TO BIND YOU?',
          options: [
            { key: 'A', label: 'PAST MORAL FAILURES' },
            { key: 'B', label: 'FEELING UNWORTHY OF LOVE' },
            { key: 'C', label: 'REPEATED SHORTCOMINGS' },
            { key: 'D', label: 'MISSED OPPORTUNITIES' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Romans 8:1',
        primaryText: 'There is therefore now no condemnation for those who are in Christ Jesus.',
        keyPhraseEmphasis: 'There is therefore now no condemnation',
        supportingReferences: ['1 John 1:9', 'Psalm 103:12'],
        connectionPoints: [
          'Conviction points to the cross; condemnation points to defeat.',
          'Christ paid the full penalty for your sin once and for all.',
          'Your standing before God is grounded in Jesus\' righteousness, not your performance.',
        ],
        reflectionQuestion: 'Will you receive the complete forgiveness Jesus already purchased for you?',
        responsePrompt: {
          question: 'WHAT TRUTH WILL YOU ANCHOR TO TODAY?',
          options: [
            { key: 'A', label: 'I AM FORGIVEN AND CLEANSED' },
            { key: 'B', label: 'CHRIST IS MY RIGHTEOUSNESS' },
            { key: 'C', label: 'MY PAST HAS NO CLAIM ON ME' },
            { key: 'D', label: 'I WALK IN FREEDOM AND TRUTH' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord Jesus, thank You that Your blood speaks a better word than my failures. I renounce the lies of condemnation and rest in Your complete forgiveness. In Jesus\' name, Amen.',
        takeaway: 'When the enemy reminds you of your past, remind him of your Savior\'s cross.',
        nextSituationPreview: 'FEAR OF THE FUTURE',
      },
    ],
  },
  {
    id: 'need-for-wisdom',
    name: 'Need for Wisdom',
    description: 'Divine direction, discernment, and spiritual clarity when facing crossroads.',
    scenarios: [
      {
        id: 'wisdom-decision-crossroads',
        categoryId: 'need-for-wisdom',
        categoryName: 'Need for Wisdom',
        situation: 'WHEN YOU NEED WISDOM FOR A DECISION',
        supportingStatement: 'Facing major life crossroads without knowing which direction leads to life.',
        choicePrompt: {
          question: 'WHAT DECISION ARE YOU WEIGHING TODAY?',
          options: [
            { key: 'A', label: 'JOB OR BUSINESS MOVE' },
            { key: 'B', label: 'RELATIONSHIP COMMITMENT' },
            { key: 'C', label: 'FINANCIAL INVESTMENT' },
            { key: 'D', label: 'FAMILY DIRECTION' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'James 1:5',
        primaryText: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
        keyPhraseEmphasis: 'ask God, who gives generously to all without finding fault',
        supportingReferences: ['Proverbs 3:5-6', 'Psalm 32:8'],
        connectionPoints: [
          'God does not mock you for being confused or uncertain.',
          'He delights in giving generous guidance to humble hearts.',
          'Wisdom starts by asking Him before leaning on your own logic.',
        ],
        reflectionQuestion: 'Have you spent as much time praying for wisdom as you have analyzing the options?',
        responsePrompt: {
          question: 'WHAT IS YOUR PRAYER FOR GUIDANCE?',
          options: [
            { key: 'A', label: 'OPEN THE RIGHT DOOR' },
            { key: 'B', label: 'CLOSE THE WRONG DOOR' },
            { key: 'C', label: 'GIVE ME CLARITY OF SPIRIT' },
            { key: 'D', label: 'CONFIRM YOUR WILL THROUGH SCRIPTURE' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'All-wise God, I surrender my logic and limited view to You. Illuminate my path with Your heavenly wisdom, and grant me confidence to walk in Your perfect will. In Jesus\' name, Amen.',
        takeaway: "God never withholds wisdom from those who seek it with a surrendered heart.",
        nextSituationPreview: 'WHEN WAITING FEELS TOO SLOW',
      },
    ],
  },
  {
    id: 'waiting-and-uncertainty',
    name: 'Waiting & Uncertainty',
    description: 'Holy patience and quiet endurance when God’s timing feels slow or silent.',
    scenarios: [
      {
        id: 'waiting-timing-feels-slow',
        categoryId: 'waiting-and-uncertainty',
        categoryName: 'Waiting & Uncertainty',
        situation: 'WHEN WAITING FEELS TOO SLOW',
        supportingStatement: 'When prayers seem unanswered and you wonder if God has forgotten His promise.',
        choicePrompt: {
          question: 'WHAT HAVE YOU BEEN WAITING ON GOD FOR?',
          options: [
            { key: 'A', label: 'AN ANSWERED PRAYER FOR HEALING' },
            { key: 'B', label: 'A SPOUSE OR RESTORED MARRIAGE' },
            { key: 'C', label: 'A CAREER OPENING OR PROVISION' },
            { key: 'D', label: 'A CHILD OR FAMILY BREAKTHROUGH' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Isaiah 40:31',
        primaryText: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.',
        keyPhraseEmphasis: 'they who wait for the Lord shall renew their strength',
        supportingReferences: ['Psalm 27:14', 'Lamentations 3:25-26'],
        connectionPoints: [
          'Waiting on God is not passive stalling; it is an act of spiritual worship.',
          'While you wait on God, God is working in you and preparing what lies ahead.',
          'Those who wait on the Lord do not run dry; they renew their wings.',
        ],
        reflectionQuestion: 'What spiritual muscles is God strengthening in your heart while you wait?',
        responsePrompt: {
          question: 'HOW WILL YOU WAIT TODAY?',
          options: [
            { key: 'A', label: 'WAIT WITH EXPECTANT HOPE' },
            { key: 'B', label: 'WAIT IN FAITHFUL SERVICE' },
            { key: 'C', label: 'REFUSE TO COMPLAIN OR PANIC' },
            { key: 'D', label: 'THANK GOD IN ADVANCE' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, teach me how to wait well. When delays frustrate my flesh, anchor my soul in Your flawless calendar. I trust Your perfect timing. In Jesus\' name, Amen.',
        takeaway: 'A delay from God is never a denial from God; His timing is always exact.',
        nextSituationPreview: 'WHEN YOU FEEL COMPLETELY ALONE',
      },
      {
        id: 'waiting-not-knowing-next-step',
        categoryId: 'waiting-and-uncertainty',
        categoryName: 'Waiting & Uncertainty',
        situation: 'WHEN PLANS HAVE SUDDENLY CHANGED',
        supportingStatement: 'When life takes an unexpected detour and your roadmap is torn to pieces.',
        choicePrompt: {
          question: 'HOW DID YOUR PLANS GET DISRUPTED?',
          options: [
            { key: 'A', label: 'UNEXPECTED JOB CHANGE' },
            { key: 'B', label: 'RELATIONSHIP DISAPPOINTMENT' },
            { key: 'C', label: 'FINANCIAL REVERSAL' },
            { key: 'D', label: 'RELOCATION OR LIFE TRANSITION' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Proverbs 16:9',
        primaryText: 'The heart of man plans his way, but the Lord establishes his steps.',
        keyPhraseEmphasis: 'the Lord establishes his steps',
        supportingReferences: ['Jeremiah 29:11', 'Romans 8:28'],
        connectionPoints: [
          'Our plans are often about our comfort; God\'s steps are about our destiny.',
          'A closed door is often divine protection from something you cannot foresee.',
          'You can surrender your schedule to the One who sees the end from the beginning.',
        ],
        reflectionQuestion: 'Can you thank God for a closed door today, trusting His better redirection?',
        responsePrompt: {
          question: 'WHAT HEART POSTURE WILL YOU CHOOSE?',
          options: [
            { key: 'A', label: 'SURRENDER MY TIME TABLE' },
            { key: 'B', label: 'LOOK FOR GOD IN THE DETOUR' },
            { key: 'C', label: 'PRAY FOR NEW VISION' },
            { key: 'D', label: 'TRUST HIS SOVEREIGN GOODNESS' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Sovereign God, my plans may have changed, but Your eternal purpose for my life has never wavered. Establish my steps today according to Your will. In Jesus\' name, Amen.',
        takeaway: 'God never consults your calendar to fulfill His promises in your life.',
        nextSituationPreview: 'WHEN WORRY OVERWHELMS YOUR MIND',
      },
    ],
  },
  {
    id: 'faith-and-trust',
    name: 'Faith & Trust',
    description: 'Anchoring your soul to God’s promises when human logic and senses fail.',
    scenarios: [
      {
        id: 'faith-stepping-into-the-unknown',
        categoryId: 'faith-and-trust',
        categoryName: 'Faith & Trust',
        situation: 'WHEN YOUR FAITH FEELS WEAK',
        supportingStatement: 'When doubt creeps into your mind and you wonder if God will truly come through.',
        choicePrompt: {
          question: 'WHAT CAUSES DOUBT TO WHISPER TO YOU?',
          options: [
            { key: 'A', label: 'PROLONGED SILENCE' },
            { key: 'B', label: 'CIRCUMSTANCES GETTING WORSE' },
            { key: 'C', label: 'VOICES OF UNBELIEF AROUND ME' },
            { key: 'D', label: 'MY OWN WEAK FEELINGS' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Proverbs 3:5-6',
        primaryText: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.',
        keyPhraseEmphasis: 'do not lean on your own understanding',
        supportingReferences: ['Hebrews 11:1', '2 Corinthians 5:7'],
        connectionPoints: [
          'Faith is not the absence of questions; it is the decision to trust God anyway.',
          'Your understanding is limited by what you see; God sees eternity.',
          'Acknowledging Him in the small steps clears the path for the big ones.',
        ],
        reflectionQuestion: 'Where are you leaning on your own logic instead of resting in God\'s promise?',
        responsePrompt: {
          question: 'WHAT WILL BE YOUR DECLARATION OF TRUST?',
          options: [
            { key: 'A', label: 'LORD, I BELIEVE; HELP MY UNBELIEF' },
            { key: 'B', label: 'I WALK BY FAITH, NOT SIGHT' },
            { key: 'C', label: 'GOD\'S WORD IS HIGHER THAN MY FEELINGS' },
            { key: 'D', label: 'I WILL NOT BE MOVED' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, I choose trust over anxiety. Expand my faith beyond the boundaries of my human senses. Lead me on straight paths for Your name\'s sake. In Jesus\' name, Amen.',
        takeaway: "Faith does not make things easy; it makes them possible through God's power.",
        nextSituationPreview: 'WHEN WORK OR PURPOSE FEELS EMPTY',
      },
    ],
  },
  {
    id: 'strength-and-perseverance',
    name: 'Strength & Perseverance',
    description: 'Supernatural endurance, grit, and spiritual resilience for the long race.',
    scenarios: [
      {
        id: 'strength-running-on-empty',
        categoryId: 'strength-and-perseverance',
        categoryName: 'Strength & Perseverance',
        situation: 'RUNNING ON EMPTY',
        supportingStatement: 'When demands exceed your energy and you need supernatural stamina to keep moving.',
        choicePrompt: {
          question: 'WHERE IS YOUR ENERGY MOST DRAINED?',
          options: [
            { key: 'A', label: 'PHYSICAL EXHAUSTION' },
            { key: 'B', label: 'EMOTIONAL BURNOUT' },
            { key: 'C', label: 'CARETAKING RESPONSIBILITIES' },
            { key: 'D', label: 'HEAVY WORKLOAD' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Philippians 4:13',
        primaryText: 'I can do all things through him who strengthens me.',
        keyPhraseEmphasis: 'through him who strengthens me',
        supportingReferences: ['Ephesians 6:10', '2 Corinthians 12:9-10'],
        connectionPoints: [
          'Paul wrote this not from a palace of comfort, but from a Roman prison.',
          'Christ does not just give you strength; He IS your strength.',
          'When you are at the end of your human rope, God\'s infinite grace takes over.',
        ],
        reflectionQuestion: 'Are you striving in your own willpower, or pulling from Christ\'s inexhaustible well?',
        responsePrompt: {
          question: 'WHAT IS YOUR BATTLE CRY TODAY?',
          options: [
            { key: 'A', label: 'CHRIST IN ME IS ENOUGH' },
            { key: 'B', label: 'HIS GRACE IS SUFFICIENT' },
            { key: 'C', label: 'I WILL PRESS FORWARD' },
            { key: 'D', label: 'THE JOY OF THE LORD IS MY STRENGTH' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord Jesus, infuse my heart, mind, and body with Your resurrection power. Where I am weak, let Your strength be made perfect. In Jesus\' name, Amen.',
        takeaway: "Your limits are the starting place for God's limitless strength.",
        nextSituationPreview: 'WHEN RELATIONSHIPS ARE STRAINED',
      },
    ],
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Love, patience, healthy boundaries, and grace-filled communication with others.',
    scenarios: [
      {
        id: 'relationships-difficult-people',
        categoryId: 'relationships',
        categoryName: 'Relationships',
        situation: 'WHEN RELATIONSHIPS ARE STRAINED',
        supportingStatement: 'When misunderstandings, hurtful words, or distance test your capacity to love.',
        choicePrompt: {
          question: 'WHAT CHALLENGE IN RELATIONSHIPS HURTS MOST?',
          options: [
            { key: 'A', label: 'A HARSH OR CRITICAL PERSON' },
            { key: 'B', label: 'COLD DISTANCE IN MARRIAGE OR FAMILY' },
            { key: 'C', label: 'UNREPAIRED MISUNDERSTANDING' },
            { key: 'D', label: 'DIFFICULT WORKPLACE DYNAMICS' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Colossians 3:12-13',
        primaryText: 'Put on then, as God\'s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.',
        keyPhraseEmphasis: 'as the Lord has forgiven you, so you also must forgive',
        supportingReferences: ['1 Corinthians 13:4-7', 'Proverbs 17:9'],
        connectionPoints: [
          'Christian love is not an emotional feeling; it is a spiritual choice.',
          'We love others not because they deserve it, but because Christ loved us.',
          'Patience with difficult people reflects the patience God extends to us every day.',
        ],
        reflectionQuestion: 'Who is God asking you to show compassion or forgiveness to this week?',
        responsePrompt: {
          question: 'WHAT RESPONSE WILL BRING HONOR TO GOD?',
          options: [
            { key: 'A', label: 'EXTEND UNCONDITIONAL GRACE' },
            { key: 'B', label: 'INITIATE A GENTLE CONVERSATION' },
            { key: 'C', label: 'PRAY PRIVATELY FOR THEIR WELL-BEING' },
            { key: 'D', label: 'SET HEALTHY, GODLY BOUNDARIES' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, clothe me in compassion, kindness, and supernatural patience. Give me the grace to forgive others as You have generously forgiven me. In Jesus\' name, Amen.',
        takeaway: 'Forgiving someone does not excuse their wrongdoing; it frees you from their control.',
        nextSituationPreview: 'WHEN YOUR FAITH FEELS WEAK',
      },
    ],
  },
  {
    id: 'work-money-and-purpose',
    name: 'Work, Money & Purpose',
    description: 'Honoring God through stewardship, career diligence, and eternal calling.',
    scenarios: [
      {
        id: 'work-searching-for-purpose',
        categoryId: 'work-money-and-purpose',
        categoryName: 'Work, Money & Purpose',
        situation: 'WHEN WORK OR PURPOSE FEELS EMPTY',
        supportingStatement: 'When daily labor feels monotonous and you hunger for deeper meaning.',
        choicePrompt: {
          question: 'WHAT PURPOSE STRUGGLE RESONATES WITH YOU?',
          options: [
            { key: 'A', label: 'FEELING UNFULFILLED AT MY JOB' },
            { key: 'B', label: 'SEEKING GOD\'S CALLING' },
            { key: 'C', label: 'FINANCIAL PRESSURE' },
            { key: 'D', label: 'BURNOUT FROM WORKPLACE STRESS' },
          ],
          instruction: 'Type A, B, C or D in the comments',
          countdownSeconds: 5,
        },
        anticipationText: "LET'S SEE WHAT SCRIPTURE SAYS",
        primaryReference: 'Colossians 3:23-24',
        primaryText: 'Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward. You are serving the Lord Christ.',
        keyPhraseEmphasis: 'work heartily, as for the Lord and not for men',
        supportingReferences: ['Matthew 6:33', 'Proverbs 16:3'],
        connectionPoints: [
          'Your primary boss is not your company or manager; it is King Jesus.',
          'When ordinary tasks are done with reverence for God, they become holy acts.',
          'Your ultimate paycheck is an eternal inheritance from the Lord.',
        ],
        reflectionQuestion: 'How would your daily attitude change if you saw Jesus as your direct supervisor?',
        responsePrompt: {
          question: 'HOW WILL YOU DEDICATE YOUR WORK TO GOD?',
          options: [
            { key: 'A', label: 'WORK WITH INTEGRITY & EXCELLENCE' },
            { key: 'B', label: 'BE A LIGHT TO MY COWORKERS' },
            { key: 'C', label: 'TRUST GOD AS MY TRUE PROVIDER' },
            { key: 'D', label: 'SURRENDER MY CAREER GOALS TO HIM' },
          ],
          instruction: 'Choose A, B, C or D in the comments',
        },
        prayer: 'Lord, give purpose to my daily labor. May my work bring glory to Your name, and may I serve with excellence knowing my eternal reward comes from You. In Jesus\' name, Amen.',
        takeaway: "When you work for the glory of God, no honest task is ever insignificant.",
        nextSituationPreview: 'WHEN GUILT CONDEMNS YOU',
      },
    ],
  },
];

// Helper to look up scenario by ID
const findScenario = (id: string): CompanionScenario => {
  for (const cat of companionTaxonomy) {
    const s = cat.scenarios.find(item => item.id === id);
    if (s) return s;
  }
  throw new Error(`Scenario not found: ${id}`);
};

/**
 * Curated emotional and content sequence for livestream broadcast.
 * Alternates categories to create spiritual rhythm rather than repeating
 * identical emotional states (Fear -> Discouragement -> Wisdom -> Waiting -> Loneliness -> Strength -> Relationships -> Faith...)
 */
export const curatedCompanionSequence: CompanionScenario[] = [
  findScenario('fear-when-afraid'),                      // 1. Fear & Anxiety
  findScenario('discouragement-weary-in-doing-good'),    // 2. Discouragement
  findScenario('wisdom-decision-crossroads'),            // 3. Need for Wisdom
  findScenario('waiting-timing-feels-slow'),             // 4. Waiting & Uncertainty
  findScenario('loneliness-feeling-forgotten'),           // 5. Loneliness
  findScenario('strength-running-on-empty'),             // 6. Strength & Perseverance
  findScenario('relationships-difficult-people'),        // 7. Relationships
  findScenario('faith-stepping-into-the-unknown'),       // 8. Faith & Trust
  findScenario('work-searching-for-purpose'),            // 9. Work & Purpose
  findScenario('guilt-condemnation'),                    // 10. Guilt & Forgiveness
  findScenario('fear-fear-of-future'),                   // 11. Fear & Anxiety (Future)
  findScenario('grief-brokenhearted'),                   // 12. Grief & Loss
  findScenario('anger-struggling-with-bitterness'),       // 13. Anger & Conflict
  findScenario('waiting-not-knowing-next-step'),         // 14. Waiting (Detours)
  findScenario('fear-racing-thoughts'),                  // 15. Fear & Anxiety (Mind)
];

export const allCompanionScenarios: CompanionScenario[] = curatedCompanionSequence;

/**
 * Calculates broadcast scene duration based on readability and content volume:
 * - Readability First. Pacing Second.
 * - Base times tailored to each scene's role in the broadcast.
 * - Dynamic extension for longer Scripture or Prayer texts.
 */
export const getStepDuration = (
  scenario: CompanionScenario,
  step: CompanionStep
): number => {
  if (scenario.timingOverrides) {
    const overrideKey = `${step}Duration` as keyof typeof scenario.timingOverrides;
    if (scenario.timingOverrides[overrideKey]) {
      return scenario.timingOverrides[overrideKey]!;
    }
  }

  switch (step) {
    case 'hook':
      return 14; // 10–15s: clear introduction to the life struggle

    case 'choice':
      return 22; // 20–25s: ample time for viewers to read 4 options and comment A, B, C, D

    case 'anticipation':
      return 7; // 5–8s: focused bridge "LET'S SEE WHAT SCRIPTURE SAYS"

    case 'scripture': {
      // 30–45s: minimum 30s, dynamically extended for longer verses
      const wordCount = scenario.primaryText.split(/\s+/).filter(Boolean).length;
      if (wordCount > 35) return 42;
      if (wordCount > 25) return 38;
      return 32;
    }

    case 'connection':
      return 28; // 25–35s: progressive reveal of 3 points (0s, 7s, 15s)

    case 'reflection':
      return 30; // 25–40s: sacred stillness and contemplation

    case 'response':
      return 22; // 20–25s: viewer faith action declaration

    case 'prayer': {
      // 30–45s: pastoral prayer + "Type Amen" call to agree
      const wordCount = scenario.prayer.split(/\s+/).filter(Boolean).length;
      if (wordCount > 30) return 40;
      return 34;
    }

    case 'takeaway':
      return 24; // 20–30s: memorable spiritual anchor

    case 'nextHook':
      return 10; // 8–12s: curiosity preview of upcoming situation

    default:
      return 20;
  }
};

/**
 * Total duration for a complete situation loop across all 10 scenes (~4.5 minutes)
 */
export const getScenarioTotalDuration = (scenario: CompanionScenario): number => {
  const steps: CompanionStep[] = [
    'hook',
    'choice',
    'anticipation',
    'scripture',
    'connection',
    'reflection',
    'response',
    'prayer',
    'takeaway',
    'nextHook',
  ];
  return steps.reduce((sum, step) => sum + getStepDuration(scenario, step), 0);
};
