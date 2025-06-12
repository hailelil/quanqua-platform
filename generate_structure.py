# generate_structure.py
import os

# Root project name
project_name = 'quanqua-platform'

# Folder structure to create
folders = [
    '.github/workflows',
    'docs',
    'gateway',
    'frontend-web',
    'mobile-app',
    'infrastructure',
    'services/dictionary-service',
    'services/submission-service',
    'services/user-service',
    'services/admin-service',
    'services/notification-service',
    'services/analytics-service'
]

# Create folders and README.md in each
for folder in folders:
    path = os.path.join(project_name, folder)
    os.makedirs(path, exist_ok=True)
    
    # Create placeholder README.md
    readme_path = os.path.join(path, 'README.md')
    with open(readme_path, 'w') as f:
        f.write(f'# {folder}\n\nThis is the `{folder}` folder for quanqua.com project.\n')

# Create project root README.md
root_readme = os.path.join(project_name, 'README.md')
with open(root_readme, 'w') as f:
    f.write('# quanqua.com Dictionary Platform\n\n')
    f.write('Microservices-based dictionary platform for Tigrigna and other Ethiopian languages.\n\n')
    f.write('Initial language pairs: Tigrigna → Tigrigna, Tigrigna → English.\n')

# Create LICENSE placeholder
license_file = os.path.join(project_name, 'LICENSE')
with open(license_file, 'w') as f:
    f.write('MIT License\n\nCopyright (c) 2025 quanqua.com\n')

print(f'✅ Project structure generated under `{project_name}` folder.')
