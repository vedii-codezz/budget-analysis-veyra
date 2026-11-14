# Contributor guide

- Work in small phases. Read the relevant source, fixtures and current docs before editing.
- Verify AI-assisted changes against the code and the UI. Never invent data or claims. Use **Unknown / not implemented** where the code cannot establish a requested fact.
- Every number in the UI must be derivable from the transactions store. Trace each input and calculation before adding or changing a displayed number. Existing exceptions are tracked in [Tasks](tasks.md).
- Update [Tasks](tasks.md) and [Verification history](verification-history.md) after each phase. Date new checks and record what was actually verified with reproducible evidence.
- Keep commits small and use clear commit messages that describe the change.
- Preserve VEYRA's visual identity. Check existing typography, spacing, palette and motion behavior in [Design](design.md) before making UI changes.
