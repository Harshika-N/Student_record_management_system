#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// QuickSort implementation for sorting students by CGPA (e.g., ranking top performers)

// Structure to represent a student record
typedef struct {
    char usn[15];
    char name[50];
    float cgpa;
    int semester;
    char department[30];
} Student;

// Swap two student records
void swap_students(Student* a, Student* b) {
    Student temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function for QuickSort (sort by descending CGPA for ranking)
int partition(Student arr[], int low, int high) {
    float pivot = arr[high].cgpa; // pivot
    int i = (low - 1); // Index of smaller element
    
    for (int j = low; j <= high - 1; j++) {
        // If current element's CGPA is greater than or equal to pivot
        // (for descending order - higher CGPA first)
        if (arr[j].cgpa >= pivot) {
            i++; // increment index of smaller element
            swap_students(&arr[i], &arr[j]);
        }
    }
    swap_students(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// QuickSort function to sort array of students by CGPA (descending)
void quicksort_students(Student arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high);
        
        // Separately sort elements before partition and after partition
        quicksort_students(arr, low, pi - 1);
        quicksort_students(arr, pi + 1, high);
    }
}

// Function to print student records
void print_students(Student arr[], int size) {
    printf("Rank\tUSN\t\tName\t\tCGPA\tSemester\tDepartment\n");
    printf("-----------------------------------------------------------------------------\n");
    for (int i = 0; i < size; i++) {
        printf("%d\t%s\t%s\t%.2f\t%d\t\t%s\n", 
               i + 1, arr[i].usn, arr[i].name, arr[i].cgpa, 
               arr[i].semester, arr[i].department);
    }
}

// Function to get top N performers
void get_top_performers(Student arr[], int size, int top_n) {
    if (top_n > size) top_n = size;
    
    printf("\nTop %d Performers:\n", top_n);
    printf("Rank\tUSN\t\tName\t\tCGPA\n");
    printf("-------------------------------\n");
    for (int i = 0; i < top_n; i++) {
        printf("%d\t%s\t%s\t%.2f\n", 
               i + 1, arr[i].usn, arr[i].name, arr[i].cgpa);
    }
}

// Example usage
/*
int main() {
    // Sample student data
    Student students[] = {
        {"4MG20CS001", "Alice Smith", 8.5, 4, "Computer Science"},
        {"4MG20CS002", "Bob Johnson", 7.8, 4, "Computer Science"},
        {"4MG20CS003", "Carol Davis", 9.2, 4, "Computer Science"},
        {"4MG20CS004", "David Wilson", 8.9, 4, "Computer Science"},
        {"4MG20CS005", "Emma Brown", 9.1, 4, "Computer Science"},
        {"4MG20CS006", "Frank Miller", 7.5, 4, "Computer Science"},
        {"4MG20CS007", "Grace Lee", 8.7, 4, "Computer Science"}
    };
    
    int n = sizeof(students) / sizeof(students[0]);
    
    printf("Before sorting:\n");
    print_students(students, n);
    
    // Sort students by CGPA (descending) using QuickSort
    quicksort_students(students, 0, n - 1);
    
    printf("\nAfter sorting by CGPA (descending):\n");
    print_students(students, n);
    
    // Get top 3 performers
    get_top_performers(students, n, 3);
    
    return 0;
}
*/