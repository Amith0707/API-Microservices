import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app=express();    
const PORT=5000;

app.use(cors());
app.use(express.json());


let students=[
    {"ID":1,"Name":"Akash","College":"NHCE"},
    {"ID":2,"Name":"Darshan","College":"DSCE"}
];

// Swagger configuration
const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Student API',
            version:'1.0.0',
            description:'Simple API to document student data'
        },
    },
    apis:['./exp4.js']
};

const swaggerSpec=swaggerJsdoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     description: Returns a simple message to confirm the API is running.
 *     responses:
 *       200:
 *         description: API is working successfully
 */
app.get('/',(req,res)=>{
    res.send("API IS WORKINGS SUCESSFULLY");
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     description: Returns a list of all students.
 *     responses:
 *       200:
 *         description: A JSON object containing an array of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID:
 *                         type: integer
 *                         example: 1
 *                       Name:
 *                         type: string
 *                         example: Akash
 *                       College:
 *                         type: string
 *                         example: NHCE
 */
app.get('/students', (req, res) => {
  res.json({ message: students });
});

app.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});