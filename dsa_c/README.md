# DSA Concepts in C for EduTrack

This directory contains C implementations of Data Structures and Algorithms concepts used in the EduTrack Student Records Management System.

## Files

1. `array.c` - Array implementation for fixed-size storage (e.g., student marks for a semester)
   - Operations: Initialize students, add marks, calculate subject average, find top student
   - Complexity: O(1) for access, O(n) for insertion/search

2. `linked_list.c` - Linked List implementation for dynamic student registry
   - Operations: Insert at beginning/end, insert after, delete by ID, search by ID
   - Complexity: O(1) for insertion at beginning/end, O(n) for search

3. `hash_table.c` - Hash Table implementation for instantaneous record lookups (e.g., by USN)
   - Operations: Insert, get, remove key-value pairs
   - Complexity: Average O(1) for insert/search/delete

4. `quicksort.c` - QuickSort implementation for sorting students by CGPA (ranking top performers)
   - Operations: Sort array of students by CGPA (descending), get top performers
   - Complexity: Average O(n log n), worst-case O(n^2)

## Usage

Each file contains commented example usage in a `main()` function at the bottom. Uncomment the `main()` function to test the implementations.

Compile with: `gcc -o program filename.c`

These implementations support the DSA concepts visualized in `src/pages/DSAVisualizations.tsx`:
- Arrays for fixed-size storage of student marks
- Linked Lists for dynamic student department registries  
- Hashing for instantaneous record lookups by USN
- QuickSort for ranking top performers by CGPA