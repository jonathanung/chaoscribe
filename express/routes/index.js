var express = require('express');
var router = express.Router();

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(shuffle([{
    "id": "8yW3pZsE2gH5jJ4kL6mN",
    "source": "Caschys Blog",
    "author": "Olli",
    "title": "Husqvarna bringt das Spiel \u201eDoom\u201c auf den Automower NERA",
    "description": "Husqvarna bietet allerlei Ger\u00e4tschaften f\u00fcr euren Garten an. Mit dabei sind auch Rasenm\u00e4hroboter. Erst in j\u00fcngster Vergangenheit hat man mit Automower 310E NERA und den 410XE NERA zwei neue Modelle vorgestellt, die ohne Begrenzungsdraht auskommen. Nun verk\u00fcnd\u2026",
    "url": "https://stadt-bremerhaven.de/husqvarna-bringt-das-spiel-doom-auf-den-automower-nera/",
    "urlToImage": "https://stadt-bremerhaven.de/wp-content/uploads/2024/02/Doom-Husqvarna.jpg",
    "publishedAt": "2024-02-26T15:30:56Z",
    "content": "Ja, man kann Doom auf dem Rasenm\u00e4hroboter spielen.\r\nHusqvarna bietet allerlei Ger\u00e4tschaften f\u00fcr euren Garten an. Mit dabei sind auch Rasenm\u00e4hroboter. Erst in j\u00fcngster Vergangenheit hat man mit Automo\u2026 [+1259 chars]",
    "chaosLevel": 1,
    "likes": [],
    "comments": []
  },
    {
    "id":"P3hT5gBdF6gU7rH8iJ",
    "source": "TechTimes",
    "author": "John Doe",
    "title": "New Study Reveals Surprising Benefits of Drinking Coffee",
    "description": "A recent study suggests that drinking coffee can have unexpected health benefits, including improved memory and reduced risk of certain diseases.",
    "url": "https://example.com/article1",
    "urlToImage": "https://via.placeholder.com/150",
    "publishedAt": "2024-02-27T12:00:00Z",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur lorem eget justo dapibus, non vulputate urna tempus. Nullam vel urna ac metus consectetur vehicula.",
    "chaosLevel": 2 ,
    "likes": [],
    "comments": []
  },
    {
    "id": "f6GU7rT8yU9iO0pL1s",
    "source": "TechInsider",
    "author": "Jane Smith",
    "title": "The Future of Space Exploration: What Lies Ahead",
    "description": "Experts weigh in on the future of space exploration, from manned missions to Mars to advancements in satellite technology.",
    "url": "https://example.com/article2",
    "urlToImage": "https://via.placeholder.com/150",
    "publishedAt": "2024-02-28T10:30:00Z",
    "content": "Sed finibus eros id nunc auctor, at lacinia mi aliquet. Integer convallis lectus ac purus blandit hendrerit. Fusce fermentum velit in est lobortis, a aliquam libero tincidunt.",
    "chaosLevel": 3,
    "likes": [],
    "comments": []
  },
    {
    "id": "K9jL1sM2dF3gH4jK5l",
    "source": "TechToday",
    "author": "Alice Johnson",
    "title": "Artificial Intelligence: A Blessing or a Curse?",
    "description": "As AI becomes more prevalent in our daily lives, experts debate whether its benefits outweigh the potential risks.",
    "url": "https://example.com/article3",
    "urlToImage": "https://via.placeholder.com/150",
    "publishedAt": "2024-02-29T15:45:00Z",
    "content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur eget augue eu orci dictum finibus. Vivamus maximus dui nec aliquet mattis.",
    "chaosLevel": 3 ,
    "likes": [],
    "comments": []
  },
    {
    "id":"z4BN6vM7bV8nJ9mK0l",
    "source": "TechWorld",
    "author": "Mark Wilson",
    "title": "The Rise of Quantum Computing: A New Era of Technology",
    "description": "Quantum computing promises to revolutionize the tech industry. Learn about the latest advancements and what the future holds.",
    "url": "https://example.com/article4",
    "urlToImage": "https://via.placeholder.com/150",
    "publishedAt": "2024-03-01T09:00:00Z",
    "content": "Integer sit amet velit a ligula volutpat molestie. Vestibulum in velit eget elit congue dictum. Nam sollicitudin neque sit amet neque aliquam, vel consectetur lorem hendrerit.",
    "chaosLevel": 4,
    "likes": [],
    "comments": []
  },
    {
    "id": "a1B2c3D4e5F6g7H8i9",
    "source": "TechGuru",
    "author": "Chris Brown",
    "title": "5G Technology: The Future of Mobile Connectivity",
    "description": "With the rollout of 5G technology, mobile connectivity is expected to reach new heights. Learn about the benefits and challenges of 5G.",
    "url": "https://example.com/article5",
    "urlToImage": "https://via.placeholder.com/150",
    "publishedAt": "2024-03-02T14:20:00Z",
    "content": "Fusce feugiat libero et ligula fermentum, eget malesuada ligula volutpat. Ut vitae lorem nec velit sodales efficitur. Donec auctor nisl eget dui gravida, vel faucibus lectus consectetur.",
    "chaosLevel": 5 ,
    "likes": [],
    "comments": []
  }]), 200);
  // console.log("Hello World");
});

module.exports = router;
