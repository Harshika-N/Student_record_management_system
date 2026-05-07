#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// Hash Table implementation for instantaneous record lookups (e.g., student records by USN)

// Simple hash function for strings
unsigned int hash(const char* str) {
    unsigned int hash = 5381;
    int c;
    
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }
    
    return hash;
}

// Hash table entry
typedef struct HashEntry {
    char* key;           // e.g., USN
    void* value;         // pointer to student record or any data
    struct HashEntry* next; // for collision resolution (chaining)
} HashEntry;

// Hash table structure
typedef struct HashTable {
    HashEntry** entries; // array of pointers to entries
    int size;            // size of the array
    int count;           // number of items stored
} HashTable;

// Create a new hash table
HashTable* create_hash_table(int size) {
    HashTable* table = (HashTable*)malloc(sizeof(HashTable));
    if (table == NULL) {
        return NULL;
    }
    
    table->size = size;
    table->count = 0;
    table->entries = (HashEntry**)calloc(size, sizeof(HashEntry*));
    if (table->entries == NULL) {
        free(table);
        return NULL;
    }
    
    return table;
}

// Create a new hash entry
HashEntry* create_hash_entry(const char* key, void* value) {
    HashEntry* entry = (HashEntry*)malloc(sizeof(HashEntry));
    if (entry == NULL) {
        return NULL;
    }
    
    entry->key = strdup(key);
    entry->value = value;
    entry->next = NULL;
    
    return entry;
}

// Insert a key-value pair into the hash table
bool hash_table_insert(HashTable* table, const char* key, void* value) {
    if (table == NULL || key == NULL) {
        return false;
    }
    
    // Compute index
    unsigned int index = hash(key) % table->size;
    
    // Check if key already exists (update case)
    HashEntry* entry = table->entries[index];
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            entry->value = value; // update value
            return true;
        }
        entry = entry->next;
    }
    
    // Key doesn't exist, insert new entry at the beginning of the chain
    HashEntry* new_entry = create_hash_entry(key, value);
    if (new_entry == NULL) {
        return false;
    }
    
    new_entry->next = table->entries[index];
    table->entries[index] = new_entry;
    table->count++;
    
    return true;
}

// Retrieve value by key from the hash table
void* hash_table_get(HashTable* table, const char* key) {
    if (table == NULL || key == NULL) {
        return NULL;
    }
    
    unsigned int index = hash(key) % table->size;
    HashEntry* entry = table->entries[index];
    
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            return entry->value;
        }
        entry = entry->next;
    }
    
    return NULL; // key not found
}

// Remove a key-value pair from the hash table
bool hash_table_remove(HashTable* table, const char* key) {
    if (table == NULL || key == NULL) {
        return false;
    }
    
    unsigned int index = hash(key) % table->size;
    HashEntry* entry = table->entries[index];
    HashEntry* prev = NULL;
    
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            // Found the entry to remove
            if (prev == NULL) {
                // Removing the first entry in the chain
                table->entries[index] = entry->next;
            } else {
                prev->next = entry->next;
            }
            
            free(entry->key);
            free(entry);
            table->count--;
            return true;
        }
        prev = entry;
        entry = entry->next;
    }
    
    return false; // key not found
}

// Free the hash table
void free_hash_table(HashTable* table) {
    if (table == NULL) {
        return;
    }
    
    for (int i = 0; i < table->size; i++) {
        HashEntry* entry = table->entries[i];
        while (entry != NULL) {
            HashEntry* temp = entry;
            entry = entry->next;
            free(temp->key);
            free(temp);
        }
    }
    
    free(table->entries);
    free(table);
}

// Example usage with student records
/*
typedef struct {
    char usn[15];
    char name[50];
    float cgpa;
    int semester;
} StudentRecord;

int main() {
    // Create hash table for student records (size 100 for example)
    HashTable* student_table = create_hash_table(100);
    
    // Create a student record
    StudentRecord* alice = (StudentRecord*)malloc(sizeof(StudentRecord));
    strcpy(alice->usn, "4MG20CS001");
    strcpy(alice->name, "Alice Smith");
    alice->cgpa = 8.5;
    alice->semester = 4;
    
    // Insert into hash table
    hash_table_insert(student_table, alice->usn, alice);
    
    // Retrieve by USN
    StudentRecord* found = (StudentRecord*)hash_table_get(student_table, "4MG20CS001");
    if (found != NULL) {
        printf("Found student: %s, CGPA: %.2f\n", found->name, found->cgpa);
    }
    
    // Clean up
    free_hash_table(student_table);
    // Note: We don't free the individual student records here because the hash table doesn't own them
    // In a real application, you might want to manage ownership differently
    
    return 0;
}
*/