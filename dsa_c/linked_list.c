#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Linked List implementation for dynamic student registry (adding/removing students)

// Structure to represent a student node
typedef struct StudentNode {
    int student_id;
    char name[50];
    float cgpa;
    char department[30];
    int semester;
    struct StudentNode* next;
} StudentNode;

// Create a new student node
StudentNode* create_student_node(int id, const char* name, float cgpa, 
                                const char* dept, int sem) {
    StudentNode* new_node = (StudentNode*)malloc(sizeof(StudentNode));
    if (new_node == NULL) {
        printf("Memory allocation failed\n");
        return NULL;
    }
    
    new_node->student_id = id;
    strcpy(new_node->name, name);
    new_node->cgpa = cgpa;
    strcpy(new_node->department, dept);
    new_node->semester = sem;
    new_node->next = NULL;
    
    return new_node;
}

// Insert student at the beginning of the list
void insert_at_beginning(StudentNode** head, StudentNode* new_node) {
    new_node->next = *head;
    *head = new_node;
}

// Insert student at the end of the list
void insert_at_end(StudentNode** head, StudentNode* new_node) {
    if (*head == NULL) {
        *head = new_node;
        return;
    }
    
    StudentNode* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = new_node;
}

// Insert student after a specific node
void insert_after(StudentNode* prev_node, StudentNode* new_node) {
    if (prev_node == NULL) {
        printf("Previous node cannot be NULL\n");
        return;
    }
    
    new_node->next = prev_node->next;
    prev_node->next = new_node;
}

// Delete student by student ID
void delete_student(StudentNode** head, int id) {
    if (*head == NULL) {
        printf("List is empty\n");
        return;
    }
    
    StudentNode* temp = *head;
    StudentNode* prev = NULL;
    
    // If head node itself holds the key to be deleted
    if (temp != NULL && temp->student_id == id) {
        *head = temp->next;
        free(temp);
        return;
    }
    
    // Search for the key to be deleted
    while (temp != NULL && temp->student_id != id) {
        prev = temp;
        temp = temp->next;
    }
    
    // If key was not present in linked list
    if (temp == NULL) {
        printf("Student with ID %d not found\n", id);
        return;
    }
    
    // Unlink the node from linked list
    prev->next = temp->next;
    free(temp);
}

// Search for a student by ID
StudentNode* search_student(StudentNode* head, int id) {
    StudentNode* current = head;
    while (current != NULL) {
        if (current->student_id == id)
            return current;
        current = current->next;
    }
    return NULL;
}

// Print the student list
void print_student_list(StudentNode* head) {
    StudentNode* temp = head;
    printf("Student Registry:\n");
    while (temp != NULL) {
        printf("ID: %d | Name: %s | CGPA: %.2f | Dept: %s | Sem: %d\n",
               temp->student_id, temp->name, temp->cgpa, 
               temp->department, temp->semester);
        temp = temp->next;
    }
    printf("\n");
}

// Free the entire list
void free_list(StudentNode* head) {
    StudentNode* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

// Example usage
/*
int main() {
    StudentNode* head = NULL;
    
    // Insert students
    StudentNode* s1 = create_student_node(101, "Alice Smith", 8.5, "Computer Science", 3);
    StudentNode* s2 = create_student_node(102, "Bob Johnson", 7.8, "Electronics", 4);
    StudentNode* s3 = create_student_node(103, "Carol Davis", 9.2, "Mechanical", 2);
    
    insert_at_end(&head, s1);
    insert_at_end(&head, s2);
    insert_at_beginning(&head, s3);
    
    print_student_list(head);
    
    // Search for a student
    StudentNode* found = search_student(head, 102);
    if (found != NULL) {
        printf("Found: ID: %d, Name: %s, CGPA: %.2f\n", 
               found->student_id, found->name, found->cgpa);
    }
    
    // Delete a student
    delete_student(&head, 102);
    printf("After deleting student with ID 102:\n");
    print_student_list(head);
    
    // Free memory
    free_list(head);
    
    return 0;
}
*/