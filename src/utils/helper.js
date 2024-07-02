export function getRandomName() {
    const firstNames = [
      "Aaron", "Abigail", "Adam", "Adrian", "Aiden", "Alex", "Alexander", "Alexandra", "Alice", "Alicia", "Amanda", "Amber", 
      "Amy", "Andrea", "Andrew", "Angela", "Anna", "Anthony", "Ashley", "Austin", "Ava", "Barbara", "Benjamin", "Betty", 
      "Beverly", "Bill", "Billy", "Blake", "Bonnie", "Brandon", "Brenda", "Brian", "Brittany", "Bruce", "Bryan", "Caleb", 
      "Cameron", "Carl", "Carol", "Caroline", "Carolyn", "Catherine", "Chad", "Charles", "Charlie", "Charlotte", "Cheryl", 
      "Chris", "Christian", "Christine", "Christopher", "Cindy", "Claire", "Clara", "Clarence", "Clifford", "Cody", "Cole", 
      "Connor", "Courtney", "Craig", "Crystal", "Curtis", "Cynthia", "Daisy", "Dale", "Dana", "Daniel", "Danielle", "David", 
      "Dawn", "Dean", "Deborah", "Debra", "Denise", "Dennis", "Derek", "Diana", "Diane", "Dillon", "Donald", "Donna", 
      "Doris", "Dorothy", "Douglas", "Dylan", "Edward", "Edwin", "Elaine", "Eleanor", "Elijah", "Elizabeth", "Ella", 
      "Ellen", "Emily", "Emma", "Eric", "Erica", "Erik", "Ethan", "Eugene", "Evan", "Evelyn", "Faith", "Fiona", "Florence", 
      "Frances", "Francis", "Frank", "Gabriel", "Gail", "Gary", "Gavin", "Gene", "Geoffrey", "George", "Georgia", "Gerald", 
      "Geraldine", "Gina", "Gladys", "Glen", "Glenda", "Glenn", "Grace", "Graham", "Greg", "Gregory", "Hailey", "Hannah", 
      "Harold", "Harry", "Hazel", "Heather", "Helen", "Henry", "Herbert", "Holly", "Howard", "Hunter", "Ian", "Irene", 
      "Isaac", "Isabella", "Jack", "Jackson", "Jacob", "Jacqueline", "James", "Jamie", "Jane", "Janet", "Janice", "Jason", 
      "Jean", "Jeff", "Jeffery", "Jeffrey", "Jennifer", "Jessica", "Jessie", "Jill", "Joan", "Joanna", "Joe", "Joel", "John", 
      "Johnny", "Jonathan", "Jordan", "Joseph", "Joshua", "Joyce", "Juan", "Judith", "Judy", "Julia", "Julie", "Justin", 
      "Karen", "Katherine", "Kathleen", "Kathryn", "Kathy", "Katie", "Kayla", "Keith", "Kelly", "Kenneth", "Kevin", "Kim", 
      "Kimberly", "Kyle", "Lance", "Laura", "Lauren", "Lawrence", "Leah", "Lee", "Leonard", "Leroy", "Leslie", "Lillian", 
      "Lindsay", "Linda", "Lisa", "Logan", "Lois", "Lori", "Louis", "Louise", "Lucas", "Lucy", "Luis", "Luke", "Lydia", 
      "Madeline", "Madison", "Maggie", "Mallory", "Mandy", "Margaret", "Maria", "Marie", "Marilyn", "Marion", "Mark", 
      "Marlene", "Marsha", "Marshall", "Martha", "Martin", "Marvin", "Mary", "Mason", "Mathew", "Matthew", "Megan", "Melanie", 
      "Melissa", "Michael", "Michelle", "Mildred", "Milton", "Miranda", "Misty", "Mitchell", "Molly", "Monica", "Morgan", 
      "Nancy", "Natalie", "Nathan", "Neil", "Nicholas", "Nicole", "Noah", "Norma", "Oliver", "Olivia", "Oscar", "Pamela", 
      "Patricia", "Patrick", "Paul", "Paula", "Peggy", "Penny", "Peter", "Philip", "Phillip", "Phyllis", "Rachel", "Ralph", 
      "Randy", "Raymond", "Rebecca", "Regina", "Renee", "Rex", "Rhonda", "Richard", "Rick", "Ricky", "Rita", "Robert", 
      "Roberta", "Robin", "Roger", "Ronald", "Rose", "Rosemary", "Ross", "Roy", "Russell", "Ruth", "Ryan", "Samantha", 
      "Samuel", "Sandra", "Sara", "Sarah", "Scott", "Sean", "Shane", "Shannon", "Sharon", "Shaun", "Shawn", "Sheila", 
      "Shelby", "Sherri", "Sherry", "Shirley", "Sidney", "Sierra", "Simon", "Sophie", "Spencer", "Stacey", "Stacy", "Stanley", 
      "Stephanie", "Stephen", "Steve", "Steven", "Stuart", "Sue", "Susan", "Susie", "Sydney", "Sylvia", "Tamara", "Tammy", 
      "Tanya", "Tara", "Taylor", "Ted", "Teresa", "Terrence", "Terry", "Theodore", "Theresa", "Thomas", "Tiffany", "Tim", 
      "Timothy", "Tina", "Todd", "Tom", "Tommy", "Tony", "Tracey", "Tracy", "Travis", "Trevor", "Troy", "Tyler", "Valerie", 
      "Vanessa", "Vera", "Vernon", "Veronica", "Vicki", "Vickie", "Victoria", "Vincent", "Viola", "Violet", "Virginia", "Vivian", 
      "Walter", "Wanda", "Wayne", "Wendy", "Wesley", "William", "Willie", "Yvonne", "Zachary"
    ];
  
    const lastNames = [
      "Adams", "Alexander", "Allen", "Anderson", "Bailey", "Baker", "Barnes", "Bell", "Bennett", "Brooks", "Brown", "Butler", 
      "Campbell", "Carter", "Clark", "Collins", "Cook", "Cooper", "Cox", "Davis", "Diaz", "Edwards", "Evans", "Fisher", 
      "Flores", "Foster", "Garcia", "Gonzales", "Gonzalez", "Gray", "Green", "Griffin", "Hall", "Harris", "Hayes", "Henderson", 
      "Hernandez", "Hill", "Howard", "Hughes", "Jackson", "James", "Jenkins", "Johnson", "Jones", "Kelly", "King", "Lee", 
      "Lewis", "Long", "Lopez", "Martin", "Martinez", "Miller", "Mitchell", "Moore", "Morgan", "Morris", "Murphy", "Nelson", 
      "Parker", "Patterson", "Perez", "Perry", "Peterson", "Phillips", "Powell", "Price", "Ramirez", "Reed", "Reyes", 
      "Richardson", "Rivera", "Roberts", "Robinson", "Rodriguez", "Rogers", "Ross", "Russell", "Sanchez", "Sanders", 
      "Scott", "Simmons", "Smith", "Stewart", "Taylor", "Thomas", "Thompson", "Torres", "Turner", "Walker", "Ward", 
      "Washington", "Watson", "White", "Williams", "Wilson", "Wood", "Wright", "Young"
    ];
  
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
    return `${randomFirstName} ${randomLastName}`;
  }
  
  export function getRandomComment() {
    const comments = [
      // 1-5 words
      "This is amazing!",
      "Great job! Keep it up.",
      "Well done, fantastic work.",
      "Absolutely stunning effort, incredible!",
      "Love this, you're exceptional.",
      "Impressive work, keep it up!",
      "Brilliant job, outstanding performance!",
      "Superb effort, congratulations!",
      "Wonderful work, truly outstanding!",
      "Outstanding achievement, phenomenal!",
      "Top-notch, impressive!",
      "Marvelous job, well deserved praise!",
      "Remarkable effort, astonishing results!",
      "Magnificent work, flawless execution!",
      "Astonishing creativity, well done!",
      "Breathtaking performance, kudos!",
    
      // 6-10 words
      "Phenomenal talent, superb! Keep it going.",
      "Spectacular job, keep it up! You're doing great.",
      "Way to go, you've nailed it! Keep striving for excellence.",
      "Extraordinary effort, impressive results! Well deserved recognition.",
      "Mind-blowing work, bravo! You're setting new standards.",
      "Flawless execution, masterpiece! Truly exceptional performance.",
      "Masterpiece of creativity, outstanding! Your talent shines through.",
      "Bravo, this is unbelievable! Your dedication is inspiring.",
      "Unbelievable skills, keep surprising us! You're a true professional.",
      "Exceptional talent, keep pushing boundaries! Your work is inspiring.",
      "Perfect execution, well done! Hats off to your dedication.",
      "Keep rocking with such phenomenal work! You're making waves.",
      "Simply the best, congratulations! You've earned it.",
      "Awe-inspiring creativity, well deserved! Keep shining bright.",
      "Stupendous effort, setting new standards! Your dedication pays off.",
      
      // 11-15 words
      "I'm so proud of your achievements! Keep up the exceptional work you're doing.",
      "Pure excellence, your talent shines! Your contributions are invaluable to the team.",
      "Incredible performance, right on track! Your dedication and effort are truly remarkable.",
      "Keep up the good work, game-changer! You're an inspiration to everyone around you.",
      "This is remarkable, well deserved! Your consistent efforts deserve all the recognition.",
      "Well deserved recognition, making waves! You're a role model for many aspiring professionals.",
      "Such a remarkable achievement, persistence paid off! You've made a significant impact.",
      "I'm so impressed, exceptional! Your determination and skill set you apart from the rest.",
      "You're on fire, unstoppable! Keep pushing boundaries and achieving greatness.",
      "You've got what it takes, remarkable! Your ability to innovate is truly exceptional.",
      "Absolutely remarkable, a star! Your journey to success is truly inspirational.",
      "Legendary, unstoppable! Your contributions are making a lasting impact.",
      "What an accomplishment, setting standards! You're paving the way for future successes.",
      "Top-notch, blown away! Your achievements continue to inspire and motivate.",
      "You've earned this success, inspiration! Keep aiming high and surpassing expectations."
    ];
       
  
    const icons = [
      "❤️", "😊", "🚀", "👏", "👍", "🎉", "💯", "🔥", "🌟", "🎈", "✨", "🎵", "🎶", "🎁", "🥳", "🤩", "🙌", "💪", "👀", "🙈", 
      "👋", "🤟", "👑", "💎", "💖", "🌈", "🍀", "🍕", "🍔", "🥂", "🍻", "☕", "🏆", "🏅", "🥇", "🥈", "🥉", "🎖️", "💡", "📚"
    ];
  
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  
    return `${randomComment} ${randomIcon}`;
  }
  

  // utils/helper.js
export const parseISO8601Duration = (duration) => {
  if (!duration) return '';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';

  const [, hours, minutes, seconds] = match;
  const h = hours ? parseInt(hours, 10) : 0;
  const m = minutes ? parseInt(minutes, 10) : 0;
  const s = seconds ? parseInt(seconds, 10) : 0;

  let formatted = '';
  if (h > 0) {
    formatted += `${h}:`;
  }
  if (m > 0 || h > 0) {
    formatted += `${m < 10 && h > 0 ? '0' : ''}${m}:`;
  }
  if (s > 0 || (h === 0 && m === 0)) {
    formatted += `${s < 10 && (h > 0 || m > 0) ? '0' : ''}${s}`;
  }

  return formatted;
};

  