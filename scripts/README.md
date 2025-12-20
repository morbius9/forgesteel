# Scripts

## export-ds-class.ts

Export class data from the Draw Steel game system to JSON format.

### Usage

```bash
npx tsx -r tsconfig-paths/register scripts/export-ds-class.ts <className>
```

### Examples

```bash
# Export the beastheart class
npx tsx -r tsconfig-paths/register scripts/export-ds-class.ts beastheart

# Export the conduit class
npx tsx -r tsconfig-paths/register scripts/export-ds-class.ts conduit
```

### Output

The script will create a JSON file in the `exports/` directory with the full class data including:
- Class metadata (id, name, description, type)
- Features by level
- Abilities
- Subclasses
- Characteristics

The exported file will be named `<className>.json`.

### Available Classes

- beastheart
- censor
- conduit
- elementalist
- fury
- null
- shadow
- summoner
- tactician
- talent
- troubadour
