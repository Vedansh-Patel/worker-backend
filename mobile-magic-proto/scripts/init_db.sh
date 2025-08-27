
#!/bin/bash
# initialize prisma sqlite db (requires prisma CLI)
npx prisma migrate dev --name init --preview-feature
