import sys

def hello():
    if sys.argv[1]=="Mars":
        hellomars()
    else:
        helloworld()

def hellomars():
    print("Hello, Mars")

def helloworld():
    print("Hello, World")

if __name__=='__main__':
    hello()
