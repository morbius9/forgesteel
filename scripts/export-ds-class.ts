import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
	// Get class name from command line arguments
	const className = process.argv[2];
	
	if (!className) {
		console.error('Error: Class name is required');
		console.log('Usage: npx tsx -r tsconfig-paths/register scripts/export-ds-class.ts <className>');
		process.exit(1);
	}
	
	try {
		// Dynamically import the class data using relative path
		const classPath = path.join(__dirname, '..', 'src', 'data', 'classes', className, `${className}.ts`);
		
		// Check if the file exists
		if (!fs.existsSync(classPath)) {
			console.error(`Error: Class file not found at ${classPath}`);
			process.exit(1);
		}
		
		const classModule = await import(classPath);
		const classData = classModule[className];
		
		if (!classData) {
			console.error(`Error: Class "${className}" not found in module`);
			process.exit(1);
		}
		
		// Create output directory if it doesn't exist
		const outputDir = path.join(process.cwd(), 'exports');
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}
		
		// Export to JSON file
		const outputPath = path.join(outputDir, `${className}.json`);
		fs.writeFileSync(outputPath, JSON.stringify(classData, null, 2), 'utf-8');
		
		console.log(`Successfully exported class "${className}" to ${outputPath}`);
	} catch (error) {
		console.error(`Error: Failed to export class "${className}"`);
		console.error(error);
		process.exit(1);
	}
}

main();
