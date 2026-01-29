const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(BASE_URL + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

// Test functions
async function runTests() {
    console.log('Starting API Tests...\n');

    try {
        // Test 1: GET all todos (empty initially)
        console.log('Test 1: GET /todos');
        let response = await makeRequest('GET', '/todos');
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 2: POST create a new todo
        console.log('Test 2: POST /todos');
        const newTodo = {
            title: 'Learn Docker',
            description: 'Understand Docker and containerization',
        };
        response = await makeRequest('POST', '/todos', newTodo);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}`);
        const todoId = response.body._id;
        console.log(`Created Todo ID: ${todoId}\n`);

        // Test 3: POST another todo
        console.log('Test 3: POST another /todos');
        const anotherTodo = {
            title: 'Learn Kubernetes',
            description: 'Understand Kubernetes orchestration',
        };
        response = await makeRequest('POST', '/todos', anotherTodo);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 4: GET all todos
        console.log('Test 4: GET /todos');
        response = await makeRequest('GET', '/todos');
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 5: GET single todo by id
        console.log(`Test 5: GET /todos/${todoId}`);
        response = await makeRequest('GET', `/todos/${todoId}`);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 6: PUT update todo
        console.log(`Test 6: PUT /todos/${todoId}`);
        const updateTodo = {
            title: 'Learn Docker & Kubernetes',
            completed: true,
        };
        response = await makeRequest('PUT', `/todos/${todoId}`, updateTodo);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 7: GET updated todo
        console.log(`Test 7: GET updated /todos/${todoId}`);
        response = await makeRequest('GET', `/todos/${todoId}`);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 8: DELETE todo
        console.log(`Test 8: DELETE /todos/${todoId}`);
        response = await makeRequest('DELETE', `/todos/${todoId}`);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 9: GET all todos after deletion
        console.log('Test 9: GET /todos after deletion');
        response = await makeRequest('GET', '/todos');
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        // Test 10: GET deleted todo (should return 404)
        console.log(`Test 10: GET deleted /todos/${todoId} (should be 404)`);
        response = await makeRequest('GET', `/todos/${todoId}`);
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);

        console.log('All tests completed!');
    } catch (error) {
        console.error('Test error:', error);
    }
}

// Run tests
runTests();
