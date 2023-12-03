<script setup lang="ts">
// import HomeView from './views/Home-View.vue'
const code = `//! BST实现词频统计
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 最大单词长度
#define MAX_WORD_LENGTH 100
// 最大行长度
#define MAX_LINE_LENGTH 1000
// 定义文件名
#define IN_FILE "article.txt"

// 定义文件句柄
FILE *fin;

// 初始化文件句柄
int initFile()
{
    if (!(fin = fopen(IN_FILE, "r")))
    {
        fprintf(stderr, "Can't open input file %s\n", IN_FILE);
        return 0;
    }
    else
    {
        return 1;
    }
}

typedef struct Node
{
    char word[MAX_WORD_LENGTH]; // 所代表的单词
    int time;                   // 出现的次数
    struct Node *left;          // 左子
    struct Node *right;         // 右子
} Node;

// Node构造函数
Node *NewNode(char word[])
{
    Node *newNode = malloc(sizeof(Node));
    strcpy(newNode->word, word);
    newNode->time = 1;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 构造二叉查找树
Node *insert(Node *root, char *str)
{
    // 初始化根节点
    if (root == NULL)
    {
        return NewNode(str);
    }

    // 如果树中已经存在,则计数加一
    if (!strcmp(str, root->word))
    {
        root->time++;
        return root;
    }

    // 递归插入节点
    // 比当前节点小,放左边;比当前大,放右边;
    if (strcmp(str, root->word) < 0)
    {
        root->left = insert(root->left, str);
    }
    else if (strcmp(str, root->word) > 0)
    {
        root->right = insert(root->right, str);
    }
    return root;
}

void printPreorder(Node *root)
{
    if (root == NULL)
        return;
    printPreorder(root->left);
    printf("%s %d\n", root->word, root->time);
    printPreorder(root->right);
}

int main()
{
    initFile();
    Node *root = NULL;
    char *line = (char *)malloc(MAX_WORD_LENGTH * sizeof(char)); // 分配足够大的空间来存储输入的行
    char *token;
    while (!feof(fin))
    {
        // 读取行
        fgets(line, MAX_LINE_LENGTH, fin);
        token = strtok(line, " ");
        // 分割
        while (token != NULL)
        {
            // 替换掉末尾的换行符
            token[strcspn(token, "\n")] = '\0';
            // 构建BST,记得要先小写化
            root = insert(root, strlwr(token));
            token = strtok(NULL, " ");
        }
    }

    // 按照要求打印三个特定节点的值
    if (root != NULL && root->right != NULL && root->right->right != NULL)
    {
        printf("%s %s %s\n", root->word, root->right->word, root->right->right->word);
    }
    else if (root != NULL && root->right != NULL)
    {
        printf("%s %s\n", root->word, root->right->word);
    }
    else if (root != NULL)
    {
        printf("%s\n", root->word);
    }

    printPreorder(root);
    fclose(fin);

    return 0;
}

//! 二叉树的遍历
#include <stdio.h>
#include <stdlib.h>

typedef struct Node
{
	int weight;			// 权重
	struct Node *left;	// 左子
	struct Node *right; // 右子
} Node;

// Node构造函数
Node *NewNode(int weight)
{
	Node *newNode = malloc(sizeof(Node));
	newNode->weight = weight;
	newNode->left = NULL;
	newNode->right = NULL;
	return newNode;
}

// 构造二叉查找树
Node *insert(Node *root, int weight)
{
	// 初始化根节点
	if (root == NULL)
	{
		return NewNode(weight);
	}

	// 递归插入节点
	// 比当前节点小,放左边;比当前大,放右边;
	if (weight < root->weight)
	{
		root->left = insert(root->left, weight);
	}
	else if (weight >= root->weight)
	{
		root->right = insert(root->right, weight);
	}
	return root;
}

// 前序遍历
void PreOrder(Node *root)
{
	if (root != NULL)
	{
		printf("%d\n", root->weight);
		PreOrder(root->left);
		PreOrder(root->right);
	}
}

// 中序遍历
void InOrder(Node *root)
{
	if (root != NULL)
	{
		InOrder(root->left);
		printf("%d\n", root->weight);
		InOrder(root->right);
	}
}

// 后序遍历
void PostOrder(Node *root, int count)
{
	if (root != NULL)
	{
		PostOrder(root->left, count + 1);
		PostOrder(root->right, count + 1);
		// 只遍历叶子节点
		if (root->left == NULL && root->right == NULL)
		{
			printf("%d %d\n", root->weight, count);
		}
	}
}

int main()
{
	// 获取总节点的数目
	int length;
	scanf("%d\n", &length);

	Node *root = NULL;
	for (int i = 0; i < length; i++)
	{
		int weight;
		scanf("%d", &weight);
		root = insert(root, weight);
	}
	PostOrder(root, 1);
	return 0;
}

#include <stdio.h>
#include <stdlib.h>

typedef struct Node
{
    char weight;
    struct Node *left;
    struct Node *right;
} Node;

Node *NewNode(char weight)
{
    Node *n = (Node *)malloc(sizeof(Node));
    n->weight = weight;
    n->left = NULL;
    n->right = NULL;
    return n;
}

// 重建二叉树
// pIndex为指向后序遍历中代表根节点的索引指针
Node *buildTree(char in[], char post[], int inStart, int inEnd, int *pIndex)
{
    // 递归退出
    if (inStart > inEnd)
    {
        return NULL;
    }

    Node *root = NewNode(post[*pIndex]);
    // 根节点指针前移,所以递归顺序是根节点->右子树->左子树
    (*pIndex)--;
    if (inStart == inEnd)
    {
        return root;
    }

    int iIndex; // 中序遍历中根节点的索引
    for (iIndex = inStart; iIndex <= inEnd; iIndex++)
    {
        if (in[iIndex] == root->weight)
        {
            break;
        }
    }

    // 递归构建左右子树
    // 但是要先从右子树开始遍历,因为后序遍历的顺序是左->右->根
    root->right = buildTree(in, post, iIndex + 1, inEnd, pIndex);
    root->left = buildTree(in, post, inStart, iIndex - 1, pIndex);
    return root;
}

void printPreorder(Node *root)
{
    if (root == NULL)
        return;

    printf("%c", root->weight);
    printPreorder(root->left);
    printPreorder(root->right);
}

int main()
{
    char in[10000], post[10000];
    // 获取遍历顺序
    char c;
    int length = 0;
    while ((c = getchar()) != ' ')
    {
        in[length++] = c;
    }

    int count = 0;
    while ((c = getchar()) != '\n')
    {
        post[count++] = c;
    }

    int pIndex = length - 1; // 后序遍历的最后一个元素的索引
    Node *root = buildTree(in, post, 0, length - 1, &pIndex);

    printf("preorder:\n");
    printPreorder(root);
    return 0;
}

//! 匹配文件内容(括号)
#include <stdio.h>
#include <stdlib.h>

// 定义文件名
#define IN_FILE "check.in"
#define OUT_FILE "check.out"

// 定义文件句柄
FILE *fin, *fout;

// 初始化文件句柄
int initFile()
{
    if (!(fin = fopen(IN_FILE, "r")))
    {
        fprintf(stderr, "Can't open input file %s\n", IN_FILE);
        return 0;
    }
    if (!(fout = fopen(OUT_FILE, "w")))
    {
        fprintf(stderr, "Can't open out file %s\n", OUT_FILE);
        return 0;
    }
}

#define MAX_STACK_LENGTH 1000

typedef struct Stack
{
    int top;
    char arr[MAX_STACK_LENGTH];
} Stack;

Stack *NewStack()
{
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->top = -1;
    for (int i = 0; i < MAX_STACK_LENGTH; i++)
    {
        s->arr[i] = 0;
    }
    return s;
}

// 全局单例
Stack *stack;

void push(char ch)
{
    stack->arr[++stack->top] = ch;
}

// 返回一个标识出栈是否成功的值
char pop()
{
    return stack->arr[stack->top--];
}

int match()
{
    char c;
    // 持续读取文件
    while (!feof(fin))
    {
        c = fgetc(fin);
        // 括号匹配
        if (c == '(' || c == '{')
        {
            push(c);
        }
        else if (c == ')' && pop() != '(')
        {
            return 0;
        }
        else if (c == '}' && pop() != '{')
        {
            return 0;
        }
    }
    // 再检查栈是否到底
    return 1 && stack->top == -1;
}

int main()
{
    // 初始化文件失败则返回-1退出程序
    if (!initFile())
    {
        return -1;
    }

    // 初始化单例
    stack = NewStack();

    // 匹配
    if (match())
    {
        fprintf(fout, "True\n");
    }
    else
    {
        fprintf(fout, "False\n");
    }

    fclose(fin);
    fclose(fout);
    return 0;
}

//! 反转队列-使用栈实现
#include <stdio.h>
#include <stdlib.h>

#define MAX_LENGTH 10000

typedef struct Queue
{
    int length;
    int arr[MAX_LENGTH];
} Queue;

typedef struct Stack
{
    int top;
    int arr[MAX_LENGTH];
} Stack;

Queue *createQueue()
{
    Queue *queue = (Queue *)malloc(sizeof(Queue));
    queue->length = 0;
    return queue;
}

Stack *createStack()
{
    Stack *stack = (Stack *)malloc(sizeof(Stack));
    stack->top = 0;
    return stack;
}

void push(Stack *stack, int n)
{
    stack->arr[stack->top++] = n;
}

int pop(Stack *stack)
{
    return stack->arr[--stack->top];
}

void loadInputs(Queue *queue)
{
    int length;
    scanf("%d\n", &length);
    queue->length = length;
    for (int i = 0; i < length; i++)
    {
        scanf("%d", &queue->arr[i]);
    }
}

void printQueue(Queue *queue)
{
    for (int i = 0; i < queue->length; i++)
    {
        printf("%d ", queue->arr[i]);
    }
}

void reserveQueue(Queue *queue)
{
    Stack *stack = createStack();
    for (int i = 0; i < queue->length; i++)
    {
        push(stack, queue->arr[i]);
    }
    for (int i = 0; i < queue->length; i++)
    {
        queue->arr[i] = pop(stack);
    }
}

int main()
{
    Queue *queue = createQueue();
    loadInputs(queue);
    reserveQueue(queue);
    printQueue(queue);
    return 0;
}

//! 求数组主元素:  主元素假设统计法
#include <stdio.h>

#define MAX_LENGTH 1024

int main()
{
    // 主元素索引
    int main = 0;
    // 初始化统计数组
    int statistics[MAX_LENGTH];
    for (int i = 0; i < MAX_LENGTH; i++)
    {
        statistics[i] = 0;
    }
    //  临时索引
    int temp = 0;
    //  数组长度
    int length = 0;
    while (1)
    {
        scanf("%d", &temp);
        // 统计出现的次数,注意这里有各限制是不能出现负索引
        statistics[temp]++;
        // 更新主元素索引
        if (statistics[temp] > statistics[main])
        {
            main = temp;
        }
        // 长度加一
        length++;
        if (getchar() == '\n')
        {
            break;
        }
    }

    // 主元素判断
    if (statistics[main] > (length / 2))
    {
        printf("%d\n", main);
    }
    else
    {
        printf("-1\n");
    }
    return 0;
}

//!循环链表解决约瑟夫问题
#include <stdio.h>
#include <stdlib.h>

typedef struct Node
{
    int id;
    struct Node *next;
} Node;

typedef struct CircleList
{
    int length;
    Node *head; // 循环链表的入口节点
    Node *tail; // 尾指针
} CircleList;

CircleList *createCircleList()
{
    CircleList *list = (CircleList *)malloc(sizeof(CircleList));
    list->length = 0;
    // 让两个指针都置空
    list->head = NULL;
    list->tail = NULL;
    return list;
}

Node *createNode(int id)
{
    Node *node = (Node *)malloc(sizeof(Node));
    node->id = id;
    node->next = NULL;
    return node;
}

// 添加节点
void addNode(CircleList *l, Node *n)
{
    // head初始化
    if (l->head == NULL)
    {
        l->head = n;
        l->tail = n;
        l->head->next = l->tail;
        l->tail->next = l->head;
        l->length++;
        return;
    }

    l->tail->next = n;
    n->next = l->head;
    // 移动尾指针
    l->tail = n;
    l->length++;
}

void deleteNode(CircleList *l, Node *n)
{
    // 删除头节点,头节点后移,尾节点指向新的头节点
    if (n == l->head && l->length != 1)
    {
        Node *newHead = l->head->next;
        l->head = newHead;
        l->tail->next = newHead;
        l->length--;
        return;
    }
    // 如果只剩下一个节点,则删除整个表
    if (l->length == 1)
    {
        l->head = NULL;
        l->length = 0;
        return;
    }

    // 删除操作需要两个辅助指针完成,一个前驱,一个当前节点
    Node *curr = l->head;
    Node *prev = l->head;
    // 先找到目标节点
    while (curr != n)
    {
        prev = curr;
        curr = curr->next;
    }
    // 执行删除

    prev->next = curr->next;
    l->length--;
}

// 执行约瑟夫主逻辑
CircleList *joseph(CircleList *l, int code)
{
    // 新循环链表
    CircleList *newList = createCircleList();
    Node *curr = l->head;
    int count = 0;
    while (l->length != 0)
    {
        count++;
        if (count == code)
        {
            // 出列,添加到新的list中
            addNode(newList, createNode(curr->id));
            deleteNode(l, curr);
            count = 0;
        }
        curr = curr->next;
    }

    return newList;
}

void printList(CircleList *list)
{
    Node *curr = list->head;
    while (curr->next != list->head)
    {
        printf("%d ", curr->id);
        curr = curr->next;
    }
    printf("%d ", curr->id);
}

// 开始游戏
void startGame()
{
    // 初始化循环链表
    CircleList *list = createCircleList();

    int total = 0;
    // 获取总人数
    scanf("%d", &total);
    // 构造循环链表
    for (int i = 1; i <= total; i++)
    {
        Node *n = createNode(i);
        addNode(list, n);
    }
    // 获取每轮游戏的密码
    while ((getchar() != '\n'))
    {
        int code;
        scanf("%d", &code);
        list = joseph(list, code);
    }

    printList(list);
}

int main()
{
    startGame();
    return 0;
}

//! 单链表解决多项式合并问题
#include <stdio.h>
#include <stdlib.h>

typedef struct Node
{
    double coef;       // 系数
    int exp;           // 指数
    struct Node *next; // 下一个节点
} Node;

typedef struct List
{
    int length;
    Node *head; // 头节点

} List;

// 建表
List *createList()
{
    List *ls = (List *)malloc(sizeof(List));
    ls->head = NULL;
    ls->length = 0;
    return ls;
}

// 创建节点
Node *createNode(double coef, int exp)
{
    Node *n1 = (Node *)malloc(sizeof(Node));
    n1->coef = coef;
    n1->exp = exp;
    n1->next = NULL;
    return n1;
}

// 添加节点
void addNode(List *ls, Node *node)
{
    // 如果表头为空则直接设置为表头
    if (!ls->head)
    {
        ls->head = node;
        ls->length++;
        return;
    }
    // 先遍历到表尾
    Node *helper = ls->head;
    while (helper->next)
    {
        helper = helper->next;
    }
    // 在表尾加节点
    helper->next = node;
    ls->length++;
}

// 删除节点
void deleteNode(List *ls, Node *target)
{
    // 如果删除的是入口节点,则入口节点后移
    if (target == ls->head)
    {
        ls->head = ls->head->next;
        ls->length--;
        return;
    }

    Node *curr = ls->head;
    Node *prev = ls->head;

    // 先找到目标节点
    while (curr != target)
    {
        prev = curr;
        curr = curr->next;
    }

    // 执行删除
    prev->next = curr->next;
    ls->length--;
}

// 交换节点
void swapNode(Node *n1, Node *n2)
{
    int tempCoef = n1->coef;
    n1->coef = n2->coef;
    n2->coef = tempCoef;

    int tempExp = n1->exp;
    n1->exp = n2->exp;
    n2->exp = tempExp;
}

// 使用冒泡排序算法对链表进行排序
void sortList(List *ls)
{
    int swapped, i;
    Node *ptr1;
    Node *lptr = NULL;

    // 检查链表是否为空
    if (ls->head == NULL)
    {
        return;
    }

    do
    {
        swapped = 0;
        ptr1 = ls->head;

        while (ptr1->next != lptr)
        {
            if (ptr1->exp > ptr1->next->exp)
            {
                // int temp = ptr1->exp;
                // ptr1->exp = ptr1->next->exp;
                // ptr1->next->exp = temp;
                swapNode(ptr1, ptr1->next);
                swapped = 1;
            }
            ptr1 = ptr1->next;
        }
        lptr = ptr1;
    } while (swapped);
}

// 多项式合并
List *mergeList(List *l1, List *l2)
{
    Node *p1 = l1->head;
    Node *p2 = l2->head;

    while (p1)
    {
        // 合并
        while (p2)
        {
            // 指数相等则系数合并
            if (p1->exp == p2->exp)
            {
                p1->coef += p2->coef;
                // 相加后系数为0,则删除节点
                if (p1->coef == 0)
                {
                    deleteNode(l1, p1);
                }
                deleteNode(l2, p2);
                break;
            }
            else
            {
                // 否则遍历p2
                p2 = p2->next;
            }
        }

        // 重置p2的状态
        p2 = l2->head;
        // 遍历p1
        if (p1->next)
        {
            p1 = p1->next;
        }
        else
        {
            // 合并剩余的
            p1->next = p2;
            break;
        }
    }

    sortList(l1);
}

// 打印整个list
void printWholeList(List *ls)
{
    Node *n = ls->head;
    while (n)
    {
        printf("current node: %.1fX^%d\n", n->coef, n->exp);
        n = n->next;
    }
}

// 节点在链表中的索引
void printNode(List *ls, int index)
{
    Node *n = ls->head;
    for (int i = 0; i < index - 1; i++)
    {
        n = n->next;
    }
    printf("%.1f %d\n", n->coef, n->exp);
}

// 将输入装载进list
void loadInputsToList(List *l)
{
    // 换行符标志量
    char ak = 0;
    while (1)
    {
        // 装载节点
        float coef;
        int exp;
        scanf("%f%d", &coef, &exp);
        Node *n = createNode(coef, exp);
        addNode(l, n);
        // 整行读取完毕
        if ((ak = getchar() == '\n'))
        {
            break;
        }
    }
}

int main()
{
    List *l1 = createList();
    loadInputsToList(l1);

    List *l2 = createList();
    loadInputsToList(l2);

    mergeList(l1, l2);

    printNode(l1, 2);
}
`
</script>

<template>
    <!-- <HomeView /> -->
    <pre>
        {{ code }}
    </pre>
</template>

<style scoped></style>
