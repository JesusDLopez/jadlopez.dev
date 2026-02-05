# Workflow

This is the modus operandi for any work done in this folder or project.

1. Characterize need: one sentence goal + acceptance criteria.
2. Add to backlog: create one file per action in `kanban/backlog/`.
3. Activate action: move the action file into `kanban/doing/`.
4. Create branch: `chore/`, `feat/`, or `fix/` + short slug.
5. Work: implement, run relevant checks.
6. Review: quick self-check + user sign-off if needed.
7. Commit: single focused commit (or a small set).
8. Push: `git push -u origin <branch>`.
9. Complete: move the action file into `kanban/finished/`.
10. Pull request (optional): open PR or merge as you prefer.

## Kanban Structure

```
kanban/
├── backlog/   # Tasks identified but not yet started
├── doing/     # Tasks currently in progress
└── finished/  # Completed tasks (for reference)
```
