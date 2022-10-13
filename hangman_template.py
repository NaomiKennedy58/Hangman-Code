# Name:
# MIT Username: 
# 6.S189 Project 1: Hangman template
# hangman_template.py

# Import statements: DO NOT delete these! DO NOT write code above this!
from random import randrange
from string import *

# -----------------------------------
# Helper code
# (you don't need to understand this helper code)
# Import hangman words

WORDLIST_FILENAME = "words.txt"

def load_words():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print( "  ", len(wordlist), "words loaded.")
    print('Enter play_hangman() to play a game of hangman!')
    return wordlist

# actually load the dictionary of words and point to it with 
# the words_dict variable so that it can be accessed from anywhere
# in the program
words_dict = load_words()


# Run get_word() within your program to generate a random secret word
# by using a line like this within your program:
# secret_word = get_word()

def get_word():
    """
    Returns a random word from the word list
    """
    word=words_dict[randrange(0,len(words_dict))]
    return word

# end of helper code
# -----------------------------------


# CONSTANTS
MAX_GUESSES = 6

# GLOBAL VARIABLES 
secret_word = '' # Change this 
letters_guessed = []

# From part 3b:
def word_guessed():
    '''
    Returns True if the player has successfully guessed the word,
    and False otherwise.
    '''
    global secret_word
    global letters_guessed

def is_word_guessed(secret_word,letters_guessed):
    word_length=len(secret_word)
    Runs=list(range(word_length))
    missing_letter=0
    for i in Runs:
        test=secret_word[i]
        if (test in letters_guessed)==False:
            missing_letter=1
    if missing_letter==0:
        return True
    elif missing_letter==1:
        return False

def print_guessed():
    '''
    Prints a string that contains the word with a dash "-" in
    place of letters not guessed yet. 
    '''
    global secret_word
    global letters_guessed
    
def get_guessed_word(secret_word,letters_guessed):
    word_length=len(secret_word)
    Runs=list(range(word_length))
    Progress=''
    for i in Runs:
        test_letter=secret_word[i]
        if (test_letter in letters_guessed)==True:
            Progress=Progress+test_letter
        elif (test_letter in letters_guessed)==False:
            Progress=Progress+'_ '
    return Progress

def get_available_letters(letters_guessed):
    alphabet='abcdefghijklmnopqrstuvwxyz'
    Runs=list(range(26))
    remaining_letters=''
    for i in Runs:
        if (alphabet[i] in letters_guessed)==False:
            remaining_letters=remaining_letters+alphabet[i]
    return remaining_letters


def play_hangman():
    global secret_word
    global letters_guessed

    secret_word=get_word()
    guesses_remaining=6
    warnings_remaining=3
    Win=False
    letters_guessed=[]
    available_letters='abcdefghijklmnopqrstuvwxyz'
    partial_word=get_guessed_word(secret_word,letters_guessed)

    while guesses_remaining>0 and Win==False:

        print(partial_word)
        print('----------------------')
        print('You have ', guesses_remaining, ' guesses left')
        print('Available letters: ', available_letters)

        guess=input("Choose a letter that might be in the word: ")

        if type(guess)==str and guess[0].islower()==False:
            guess=guess.lower()

        if (type(guess)!=str)==True or (guess in available_letters)==False:
            warnings_remaining=warnings_remaining-1
            print('Hangman only accepts letters as input, that you have not already guessed. You have ', warnings_remaining ,' warnings left.')
            if warnings_remaining<=0:
                guesses_remaining=guesses_remaining-1
                print('Invalid characters are being inputted. You have ',guesses_remaining,' guesses remaining.')
        else:
            letters_guessed.append(guess)

            Win=is_word_guessed(secret_word,letters_guessed)
            if Win==True:
                print('Congratulations, you have correctly guessed ', secret_word, ' as the word')
                return True
            elif Win==False:
                partial_word=get_guessed_word(secret_word,letters_guessed)
                available_letters=get_available_letters(letters_guessed)
                if (guess in secret_word)==True:
                    print('That letter is in the word, you now have:')
                elif (guess in secret_word)==False:
                    guesses_remaining=guesses_remaining-1
                    print('That letter is not in the word, you still have: ')
        if guesses_remaining==0:
            print('You have failed to guess the word. The word is ', secret_word)
            return False

    # Update secret_word. Don't uncomment this line until you get to Step 8.
    # secret_word  = get_word()


