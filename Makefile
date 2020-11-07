start: api
	npm run-script startWeb
build: api
	npm run-script buildWeb
	rsync build/ ../bibler-server/static/ -r
api:
	openapi-generator generate \
	-g typescript-fetch \
	-o src \
	-i http://localhost:8000/openapi.json \
	--api-name-suffix=Bibler \
	--api-package=api \
	--additional-properties=typescriptThreePlus=true
	sed -i "s/localhost"/localhost:8000"/g" src/runtime.ts