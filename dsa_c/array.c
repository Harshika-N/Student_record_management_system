#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Array implementation for fixed-size storage (e.g., student marks for a semester)
#define MAX_STUDENTS 100
#define MAX_SUBJECTS 5

// Structure to represent student marks
typedef struct {
    int student_id;
    char name[50];
    float marks[MAX_SUBJECTS];
    float total;
    float percentage;
} Student;

// Initialize array of students
void init_students(Student students[], int size) {
    for (int i = 0; i < size; i++) {
        students[i].student_id = 0;
        students[i].total = 0.0;
        students[i].percentage = 0.0;
        for (int j = 0; j < MAX_SUBJECTS; j++) {
            students[i].marks[j] = 0.0;
        }
    }
}

// Add marks for a student
void add_marks(Student *student, float marks[], int subject_count) {
    student->total = 0.0;
    for (int i = 0; i < subject_count && i < MAX_SUBJECTS; i++) {
        student->marks[i] = marks[i];
        student->total += marks[i];
    }
    student->percentage = (student->total / (subject_count * 100.0)) * 100.0;
}

// Calculate average marks for a subject across all students
float subject_average(Student students[], int count, int subject_index) {
    float sum = 0.0;
    for (int i = 0; i < count; i++) {
        sum += students[i].marks[subject_index];
    }
    return count > 0 ? sum / count : 0.0;
}

// Find student with highest total marks
int find_top_student(Student students[], int count) {
    if (count <= 0) return -1;
    
    int top_index = 0;
    for (int i = 1; i < count; i++) {
        if (students[i].total > students[top_index].total) {
            top_index = i;
        }
    }
    return top_index;
}

// Print student details
void print_student(Student student) {
    printf("ID: %d, Name: %s, Total: %.2f, Percentage: %.2f%%\n", 
           student.student_id, student.name, student.total, student.percentage);
}

// Example usage
/*
int main() {
    Student class[MAX_STUDENTS];
    init_students(class, MAX_STUDENTS);
    
    // Add a student
    class[0].student_id = 1;
    strcpy(class[0].name, "John Doe");
    float marks[] = {85.0, 90.0, 78.0, 92.0, 88.0};
    add_marks(&class[0], marks, 5);
    
    print_student(class[0]);
    printf("Average for subject 0: %.2f\n", subject_average(class, 1, 0));
    printf("Top student index: %d\n", find_top_student(class, 1));
    
    return 0;
}
*/