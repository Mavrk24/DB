from anytree import Node, RenderTree,AsciiStyle,PreOrderIter
from anytree.dotexport import RenderTreeGraph

root = Node('root', value = 'null', label='') 
a = Node('คุณใช้งานคอมพิวเตอร์หรือโน๊ตบุ๊ค ?', parent=root, value='null',label='') #-
a1 = Node('สำหรัลเรียนหรือทำงาน?', parent=a, value='null',label='') #-
a2 = Node('สำหรับความบันเทิง ?', parent=a, value='null',label='') #-
a11 = Node('มากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=a1, value='null',children=[
    Node('บนเตียงหรือโซฟาหรือไม่ ?',  value='null',label='Have a life'),#5
    Node('บนหน้าตัก ?',  value='null',label='Have a life'), #6
    Node('คุณต้องก้มลงเพื่อมองหน้าจอหรือไม่ ?', value='null',label='Have a life')], label='') #7s
a12 = Node('คุณต้องก้มลงขณะพิมพ์หรือไม่ ?', parent=a1 , value='null',label='Have a life'), 
a21 = Node('มากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=a2, value='null', children=[ 
    Node('บนเตียงหรือโซฟาหรือไม่ ?',  value='null',label='Have a life'), #10
    Node('บนหน้าตัก ?',  value='null',label='Have a life'), #11
    Node('คุณต้องก้มลงเพื่อมองหน้าจอหรือไม่ ?', value='null',label='Have a life')], label='') #12s
b = Node('คุณใช้งาน iPad หรือ Tablet หรือไม่ ?', parent=root, value='null',label='')
b1 = Node('สำหรับเรียนหรือทำงาน ?', parent=b, value='null',label='')
b11 = Node('มากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=b1, value='null',children=[
    Node('บนโต๊ะ, บนเตียงหรือบนหน้าตักหรือไม่ ?',  value='null',label='Have a life')], label='') #16
b12 = Node('คุณใช้งานโดยไม่มีอุปกรณ์เสริมในการตั้ง เช่น Standing case หรือไม่ ?', parent=b1, value='null',label='') #17
b2 = Node('สำหรับความบันเทิง ?', parent=b, value='null',label='')
b21 = Node('มากกว่า 3 ชั่วโมงต่อวันหรือไม่ ?', parent=b2, value='null',children=[
    Node('บนโต๊ะ, บนเตียงหรือบนหน้าตักหรือไม่ ?',  value='null',label='Have a life')], label='') #20
b22 = Node('คุณใช้งานโดยไม่มีอุปกรณ์เสริมในการตั้ง เช่น Standing case หรือไม่ ?', parent=b2, value='null',label='') #21
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
