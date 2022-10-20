import fs from "fs";

const SONGS_DIRECTORY = "songs";
const whiteSpaceRegex = new RegExp("\\W+");
const V2 = String(SONGS_DIRECTORY);

const readLyricsFromFiles = (directory) => {
  const files = fs.readdirSync(directory);
  return files.reduce((all, filename) => {
    const path = `${directory}/${filename}`;
    return `${all}\n${fs.readFileSync(path, "utf-8")}`;
  }, "");
};

const lyricsToWords = (lyrics) => {
  const words = lyrics
    .split(whiteSpaceRegex)
    .map((word) => word.toLocaleLowerCase().trim())
    .filter((word) => word.length > 0);

  return words;
};

const MostAbundantWord = (words, Number_of_words, min_length) =>{
  let Testword="";
  let MaxFrequency=0;
  let CommonWords=[];
  let Appearances=0;
  for (let i=0; i<Number_of_words; i++) {
    if (words[i]===Testword) {
      Appearances=Appearances+1;
    } else {
      if (i>0 && Appearances===MaxFrequency) {
        CommonWords.push(Testword);
      };
      if (i>0 && Appearances>MaxFrequency){
        MaxFrequency=Appearances;
        CommonWords=[Testword];
      }
      if (words[i].length>=min_length){
        Testword=words[i];
        Appearances=1;
      }
    };
  };
  return [CommonWords, MaxFrequency];
};

const LongestWord = (words,Number_of_words) => {
  let MaxLength=0;
  let long_word="";
  for (let i=0; i<Number_of_words; i++) {
    let test_word=words[i];
    let L=test_word.length;
    if (L>MaxLength){
      MaxLength=L;
      long_word=[test_word];
    }
    if (L===MaxLength && long_word.includes(test_word)===false){
      long_word.push(test_word);
    }
  }
  return long_word
}

const SolitaryWords = (words,Number_of_words) => {
  let Testword="";
  let Appearances=0;
  let lone_words=[];
  for (let i=0; i<Number_of_words; i++) {
    if (words[i]===Testword) {
      Appearances=2;
    } else {
      if (Appearances===1){
        lone_words.push(Testword);
      }
      Testword=words[i];
      Appearances=1;
    }
  }
  return lone_words
}

const RepeatLetters = (words,Number_of_words) => {
  let repeat_letters=[];
  for (let i=0; i<Number_of_words; i++) {
    let current_word=words[i];
    let Number_of_letters=current_word.length;
    let Letters_in_word=[];
    let repeated_letter=false;
    for (let j=0; j<Number_of_letters; j++) {
      if (Letters_in_word.includes(current_word[j])===true) {
        repeated_letter=true;
      } else {
        Letters_in_word.push(current_word[j]);
      }
    }
    if (repeated_letter===true && repeat_letters.includes(current_word)===false) {
      repeat_letters.push(current_word);
    }
  }
  return [repeat_letters, repeat_letters.length]
}

const ConsecutiveLetters = (words,Number_of_words) => {
  let adj_letters=[];
  for (let i=0; i<Number_of_words; i++) {
    let current_word=words[i];
    if (adj_letters.includes(current_word)===false) {
      let Number_of_letters=current_word.length;
      let same_letter=false;
      for (let j=0; j+1<Number_of_letters; j++) {
        if (current_word[j]===current_word[j+1]) {
          same_letter=true;
        }
      }
      if (same_letter===true) {
        adj_letters.push(current_word);
      }
    }
  }
  return [adj_letters, adj_letters.length]
}

const MostVowels = (words,Number_of_words) => {
  let MaxVowels=0;
  const Vowels="aeiou";
  let Vowel_Word=[];
  let Used_Words=[];
  for (let i=0; i<Number_of_words; i++) {
    let current_word=words[i];
    if (Used_Words.includes(current_word)===false) {
      let num_vowels=0;
      let Number_of_letters=current_word.length;
      for (let j=0; j<Number_of_letters; j++) {
        if (Vowels.includes(current_word[j])===true) {
          num_vowels++;
        }
      }
      if (num_vowels>MaxVowels) {
        MaxVowels=num_vowels;
        Vowel_Word=[current_word];
      }
      else if (num_vowels===MaxVowels) {
        Vowel_Word.push(current_word);
      }
    }
    Used_Words.push(current_word);
  }
  return [Vowel_Word, MaxVowels]
}

const lyrics = readLyricsFromFiles(V2);
const words = lyricsToWords(lyrics);
words.sort();
const Number_of_words = words.length;
// const CommonWords = MostAbundantWord(words, Number_of_words,6);
// const long_word=LongestWord(words,Number_of_words);
// const lone_words=SolitaryWords(words,Number_of_words);
// const MultiLetters = RepeatLetters(words,Number_of_words);
// const MultiLetters = ConsecutiveLetters(words,Number_of_words);
const Vowel_Word = MostVowels(words,Number_of_words);
console.log(Vowel_Word)