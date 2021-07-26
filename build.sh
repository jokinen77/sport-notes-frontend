echo "Building frontend!"
npm run build

echo "Copying frontend!"
rm -r ../SportNotes/public
cp -r build ../SportNotes/public