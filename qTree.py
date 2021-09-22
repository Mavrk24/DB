from anytree import Node, RenderTree,AsciiStyle,PreOrderIter
from anytree.dotexport import RenderTreeGraph

root = Node('root', value = 'null', label='') 
a1 = Node('คุณใช้งานคอมพิวเตอร์หรือโน๊ตบุ๊คมากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=root, value='null',children=[
    Node('คุณใช้งานคอมพิวเตอร์หรือโน๊ตบุ๊คบนเตียงหรือโซฟาหรือไม่ ?',  value='null',label=''),#5
    Node('คุณใช้งานคอมพิวเตอร์หรือโน๊ตบุ๊คบนหน้าตัก ?',  value='null',label=''), #6
    Node('คุณต้องก้มลงเพื่อมองหน้าจอหรือไม่ ?', value='null',label='Have a life')], label='') #7s
a2 = Node('คุณต้องก้มลงขณะพิมพ์หรือไม่ ?', parent=root , value='null',label='')

b = Node('คุณใช้งาน iPad หรือ Tablet มากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=root, value='null',children=[
    Node('คุณใช้งาน iPad หรือ Tablet บนโต๊ะ, บนเตียงหรือบนหน้าตักหรือไม่ ?',  value='null',label='')], label='') #16
b12 = Node('คุณใช้งานโดยไม่มีอุปกรณ์เสริมในการตั้ง เช่น Standing case หรือไม่ ?', parent=root, value='null',label='') #17

c = Node('คุณทำงานวาดเขียนบ่อยหรือไม่ ?', parent=root, value='null',label='')
c1 = Node('คุณทำงานวาดเขียนบนโต๊ะหรือไม่', parent=c, value='null',label='')
c11 = Node('โต๊ะนั้นมีความชันที่เหมาะสมหรือไม่ ?', parent=c1, value='null',label='') #24s
d = Node('เก้าอี้ที่คุณนั่งไม่มีที่พักแขนใช่หรือไม่ ?', parent=root, value='null',label='')
d1 = Node('เก้าอี้ที่คุณนั่งไม่มีส่วนที่รอลรับนำ้หนักส่วนเอวใช่หรือไม่ ?', parent=d, value='null',label='')

arr = []
for a in PreOrderIter(root):
    arr.append(a.name)

def getQ():
    return arr

val = []
for a in PreOrderIter(root):
    val.append(a.depth)

def valuate():
    return val

def returnnotQ(arr):
    array = []
    for a in PreOrderIter(root):
        array.append(a.name)
    return array

def returnQ(t):
    inputs = []
    x = ''
    for a in PreOrderIter(root):
        x = a.name
        inputs.append(x)
    return inputs

def returnofQ(arr):
    return len(arr)

def func():   
    for a in PreOrderIter(root):
        b = a.parent
        if b != None:
            if (b.value != 'N'):
                print(a.name)
                a.value = input(': ')
            else:
                if (a.children!=None):   
                    del a.children
max = -1
max_q = ''
for a in PreOrderIter(root):
    if (a.value=='Y'):
        if(a.depth >= max):
            max = a.depth
            max_q = a.name
    else:
        a.parent = None

def display():
    return max_q
