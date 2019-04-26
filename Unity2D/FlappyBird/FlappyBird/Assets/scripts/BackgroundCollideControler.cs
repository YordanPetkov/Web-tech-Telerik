
using UnityEngine;

public class BackgroundCollideControler : MonoBehaviour
{

    private int numberOfBackgrounds;
    private float distanceBetweenBackgrounds;

    private int numberOfGrounds;
    private float distanceBetweenGrounds;

    private int numberOfPipes;
    private float distanceBetweenPipes;
    private bool upperPipe;


    public void Start()
    {


        var backgrounds = GameObject.FindGameObjectsWithTag("Background");
        var grounds = GameObject.FindGameObjectsWithTag("Ground");
        var pipes = GameObject.FindGameObjectsWithTag("Pipe");

        RandomizePipes(pipes);

        this.numberOfBackgrounds = backgrounds.Length;
        this.numberOfGrounds = grounds.Length;
        this.numberOfPipes = pipes.Length;

        if (this.numberOfBackgrounds < 2 || this.numberOfGrounds < 2 || this.numberOfPipes < 2)
        {
            throw new System.InvalidOperationException("You must have at least two backgrounds or grounds or pipes in your scene!");
        }

        this.distanceBetweenBackgrounds = this.DistanceBetweenObjects(backgrounds);
        this.distanceBetweenGrounds = this.DistanceBetweenObjects(grounds);
        this.distanceBetweenPipes = this.DistanceBetweenObjects(pipes);
    }   

    public void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Background")
            || collider.CompareTag("Ground")
            || collider.CompareTag("Pipe"))
        {
            var go = collider.gameObject;
            var originalPosition = go.transform.position;
            if (collider.CompareTag("Background"))
            {
                originalPosition.x +=
                        this.numberOfBackgrounds
                        * this.distanceBetweenBackgrounds;
            }
            else if (collider.CompareTag("Ground"))
            {
                originalPosition.x +=
                        this.numberOfGrounds
                        * this.distanceBetweenGrounds;
            }
            else
            {
                originalPosition.x +=
                        this.numberOfPipes
                        * this.distanceBetweenPipes;
                float randomY;
                if (upperPipe)
                {
                    randomY = Random.Range(1.5f, 2f);
                }
                else
                {
                    randomY = Random.Range(-1, 0);
                }
                originalPosition.y = randomY;
                this.upperPipe = !this.upperPipe;     
                
            }
            go.transform.position = originalPosition;

        }
        /*
        if (collider.CompareTag("Ground"))
        {
            var ground = collider.gameObject;
            var gPosition = ground.transform.position;
            gPosition.x += this.numberOfGrounds * this.distanceBetweenGrounds;
            ground.transform.position = gPosition;
        }*/
    }



    private float DistanceBetweenObjects(GameObject[] gameObjects)
    {
        float minDistance = float.MaxValue;
        for (int i = 1; i < gameObjects.Length; i++)
        {
            var currentDistance = Mathf.Abs(gameObjects[0].transform.position.x
            - gameObjects[i].transform.position.x);

            if (currentDistance < minDistance)
            {
                minDistance = currentDistance;
            }
        }
        return minDistance;
    }


    private void RandomizePipes(GameObject[] pipes)
    {
        int count = 0;
        for (int i = 0; i < pipes.Length; i++)
        {
            count++;
            var currentPipe = pipes[i];
            float randomY;
            if(count % 2 == 0) // upper pipe
            {
    
                randomY = Random.Range(1.5f, 2f);
            }
            else // down pipe
            {

                randomY = Random.Range(-1, 0);
            }
            var pipePosition = currentPipe.transform.position;
            pipePosition.y = randomY;
            currentPipe.transform.position = pipePosition;
        }
    }
}
