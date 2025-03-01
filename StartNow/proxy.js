import express from 'express'
import axios from 'axios'
import https from 'https'

const proxy = (apiRoot) => {
    const app = express()
    app.use(express.json())
    
    const instance = axios.create({
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })

    async function handleRequestError(error, res, context) {
        if (error.response) {
            const content = await error.response.data
            console.log(`[${context}] response error ${error.response.status}: `, content)
            res.status(error.response.status).send(content)
        } else if (error.request) {
            console.log(`[${context}] request error: ${error.message}`)
            res.status(404).send('no response')
        } else {
            console.log(`[${context}] error: ${error.message}`)
            res.status(500).send(error.message)
        }
    }

    function proxyGet() {
        return async (req, res) => {
            try {
                const response = await instance.get(apiRoot + req.path)
                .catch(error => handleRequestError(error, res, 'get: ' + req.path))
                if (response)
                    res.send(response.data)
                else
                    res.sendStatus(500)
            } catch (error) {
                handleRequestError(error, res, 'get: ' + req.path)
            }
        }
    }

    function proxyPost() {
        return async (req, res) => {
            try {
                const response = await instance.post(apiRoot + req.path, req.body)
                .catch(error => handleRequestError(error, res, 'post: ' + req.path))
                if (response)
                    res.send(response.data)
                else
                    res.sendStatus(500)
            } catch (error) {
                handleRequestError(error, res, 'post: ' + req.path)
            }
        }
    }

    function proxyPut() {
        return async (req, res) => {
            try {
                const response = await instance.put(apiRoot + req.path, req.body)
                .catch(error => handleRequestError(error, res, 'put: ' + req.path))
                if (response)
                    res.send(response.data)
                else
                    res.sendStatus(500)
            } catch (error) {
                handleRequestError(error, res, 'put: ' + req.path)
            }
        }
    }

    function proxyDelete() {
        return async (req, res) => {
            try {
                const response = await instance.delete(apiRoot + req.path)
                .catch(error => handleRequestError(error, res, 'delete: ' + req.path))
                if (response)
                    res.send(response.data)
                else
                    res.sendStatus(500)
            } catch (error) {
                handleRequestError(error, res, 'delete: ' + req.path)
            }
        }
    }

    // ****** project routes ******
    app.get('/projects', proxyGet())
    app.post('/projects', proxyPost())
    app.get('/projects/:projectId', proxyGet())
    app.put('/projects/:projectId', proxyPut())
    app.delete('/projects/:projectId', proxyDelete())
    
    // ****** task routes ******
    app.get('/tasks', proxyGet())
    app.post('/tasks', proxyPost())
    app.get('/tasks/:taskId', proxyGet())
    app.put('/tasks/:taskId', proxyPut())
    app.delete('/tasks/:taskId', proxyDelete())

    return app
}

export default proxy
