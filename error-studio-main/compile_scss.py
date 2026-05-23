import os
import subprocess

def compile_scss(root_dir):
    scss_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.scss') and not filename.startswith('_'):
                scss_files.append(os.path.join(dirpath, filename))

    for scss_file in scss_files:
        css_file = scss_file.replace('.scss', '.css')
        print(f"Compiling {scss_file} to {css_file}...")
        try:
            subprocess.run(['npx', 'sass', scss_file, css_file, '--no-source-map'], check=True, shell=True)
            print(f"Success: {css_file}")
        except subprocess.CalledProcessError as e:
            print(f"Error compiling {scss_file}: {e}")

if __name__ == "__main__":
    compile_scss(r'c:\Users\DIGITAL MARKETING\Downloads\samplASSDD2111_sS\ERROR_STUDIO\src')
