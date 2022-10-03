import sys

def hello():
    if sys.argv[1]=="Mars":
        hellomars()
    elif sys.argv[1]=="Jupiter":
        hellojupiter()
    else:
        helloworld()

def hellomars():
    print("Hello, Mars")
    print("Mars")

def hellojupiter():
    print("Hello, Jupiter")

def helloworld():
    print("Hello, World")

if __name__=='__main__':
    hello()
