# Axioms of Zermelo-Fraenkel Set Theory with the Axiom of Choice

Zermelo-Frankel: ZF
With Axiom of Choice: ZFC

## 1. Axiom of Extensionality
Two sets are equal if and only if they have the same elements.

**Formal Statement:**
If ∀x (x ∈ A ↔ x ∈ B), then A = B.

## 2. Axiom of Pairing
For any sets A and B, there exists a set that contains exactly A and B as elements.

**Formal Statement:**
∀A ∀B ∃C ∀x (x ∈ C ↔ (x = A ∨ x = B)).

## 3. Axiom of Union
For any set A, there exists a set that contains exactly the elements of the elements of A.

**Formal Statement:**
∀A ∃B ∀x (x ∈ B ↔ ∃C (x ∈ C ∧ C ∈ A)).

## 4. Axiom of Power Set
For any set A, there exists a set that contains all the subsets of A.

**Formal Statement:**
∀A ∃B ∀C (C ⊆ A ↔ C ∈ B).

## 5. Axiom of Infinity
There exists a set that contains the empty set and is closed under the operation of taking the successor of any element.

**Formal Statement:**
∃A (∅ ∈ A ∧ ∀x (x ∈ A → (x ∪ {x}) ∈ A)).

## 6. Axiom of Replacement
If F is a definable function, then for any set A, the image of A under F is also a set.

**Formal Statement:**
∀A ∀F [Function(F) → ∃B ∀x (x ∈ A → ∃y (y = F(x) ∧ y ∈ B))].

## 7. Axiom of Regularity (Foundation)
Every non-empty set A contains an element that is disjoint from A.

**Formal Statement:**
∀A [A ≠ ∅ → ∃B (B ∈ A ∧ B ∩ A = ∅)].

## 8. Axiom of Choice (AC)
For any set A of non-empty sets, there exists a choice function f defined on A such that for each set B in A, f(B) is an element of B.

**Formal Statement:**
∀A [A ≠ ∅ ∧ ∀B ∈ A (B ≠ ∅) → ∃f (Function(f) ∧ Dom(f) = A ∧ ∀B ∈ A (f(B) ∈ B))].

## 9. Axiom of Schema of Separation (Subset Axiom)
For any set A and any definable property P(x), there exists a subset B of A consisting of exactly those elements of A that satisfy the property P(x).

**Formal Statement:**
∀A ∃B ∀x (x ∈ B ↔ (x ∈ A ∧ P(x))).

## 10. Axiom of Schema of Replacement (Substitution Axiom)
For any set A and any definable function F, there exists a set B that contains exactly the images of the elements of A under F.

**Formal Statement:**
∀A ∀F [Function(F) → ∃B ∀x (x ∈ A → F(x) ∈ B)].

## 11. Axiom of Schema of Collection
If a definable function maps elements of a set A to a set, then the images under this function form a set.

**Formal Statement:**
∀A ∀F ∃B ∀x (x ∈ A → ∃y (y ∈ B ∧ F(x, y))).

## 12. Axiom of Choice (AC) (Alternative Formulation)
There exists a function f that, for any set A of non-empty sets, selects an element from each set in A.

**Formal Statement:**
∀A [∀B ∈ A (B ≠ ∅) → ∃f ∀B ∈ A (f(B) ∈ B)].


---
- [[Quantum Computing Since Democritus by Aaronson, Scott]]