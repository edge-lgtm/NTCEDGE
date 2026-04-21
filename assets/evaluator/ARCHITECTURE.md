# Evaluator Module Architecture

This document describes the architecture, state management, and component structure of the Evaluator module in the NTC EDGE system.

## Overview

The Evaluator module is a dedicated dashboard for processing bulk applications. It follows a government-grade enterprise design system characterized by purple-led branding, high clarity, and structured information density.

## Core Technology Stack

- **React 19**: UI Library
- **Zustand**: State Management
- **Tailwind CSS**: Styling
- **Framer Motion**: Micro-interactions and animations
- **Lucide React**: Iconography

## Module Architecture

The module is organized as a self-contained React application mounted within the Hugo portal.

### Component Tree

```text
EvaluatorApp
├── SidebarNav (Vertical rail)
├── FeedPanel (Pending/History batches)
│   ├── FeedSearchBar
│   └── FeedTabs
└── Main Content Area
    ├── BulkApplicationHeader (Tabs and Metadata)
    ├── ApplicantsTable (List view with pagination)
    │   ├── SelectionCheckbox
    │   └── StatusBadge
    ├── BulkApplicationDetails (Technical specs)
    ├── SOAView (Statement of Account recalculation)
    └── DecisionActionBar (Floating draft actions)
```

## State Management (Zustand)

The `useEvaluatorStore` manages the global state for the evaluation workflow:

- `selectedBulkId`: ID of the currently active bulk application.
- `activeTab`: Current view (Bulk Application, Details, or SOA).
- `selectedApplicantIds`: Array of IDs for currently selected rows.
- `stagedDecisions`: A map of `Record<string, Decision>` representing draft evaluations.
- `bulkApplications`: Mock data source (simulating backend repository).

### Scalability Considerations

1. **Staging Pattern**: Decisions are staged locally first. This allows evaluators to review changes across multiple pages and tabs before a single final submission, reducing accidental errors.
2. **Memoized Calculations**: SOA totals are recalculated using `useMemo` based on the unique set of selected and staged applicant IDs.
3. **Pagination Resilience**: Selection and staged decisions are preserved across pages by using ID-based tracking in the store.
4. **Decoupled Business Logic**: Recalculation logic (e.g., `calculateSOA`) and utility functions (e.g., `numberToWords`) are kept in separate utility files for testability.

## Visual Branding

The module uses a specific enterprise color palette:
- **Primary**: `#2D0C8A` (Purple)
- **Success**: `#31A24C`
- **Error**: `#E53935`
- **Surface**: White with subtle gray dividers (`#D9DCE3`)

## Accessibility (A11y)

- Semantic HTML elements (`<nav>`, `<aside>`, `<section>`, `<main>`).
- ARIA roles for complex components (tabs, search, lists).
- Unique IDs for all form inputs with associated labels.
- Sufficient color contrast for status badges and text.
