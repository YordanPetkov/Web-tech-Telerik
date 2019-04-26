using System;
using UnityEngine;

public class BackgroundCollideControler : MonoBehaviour
{

    private int numberOfBackgrounds;
    private float distanceBetweenBackgrounds;

    private int numberOfGrounds;
    private float distanceBetweenGrounds;

    private int numberOfPipes;
    private float distanceBetweenPipes;


    public void Start()
    {
        var backgrounds = GameObject.FindGameObjectsWithTag("Background");
        var grounds = GameObject.FindGameObjectsWithTag("Ground");
        var pipes = GameObject.FindGameObjectsWithTag("Pipe");

        this.numberOfBackgrounds = backgrounds.Length;
        this.numberOfGrounds = grounds.Length;
        this.numberOfPipes = pipes.Length;

        if (this.numberOfBackgrounds < 2 || this.numberOfGrounds < 2 || this.numberOfPipes < 2)
        {
            throw new InvalidOperationException("You must have at least two backgrounds or grounds or pipes in your scene!");
        }

        this.distanceBetweenBackgrounds = this.DistanceBetweenObjects(backgrounds[0], backgrounds[1]);
        this.distanceBetweenGrounds = this.DistanceBetweenObjects(grounds[0], grounds[1]);
        this.distanceBetweenPipes = this.DistanceBetweenObjects(pipes[0], pipes[1]);
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
                go.transform.position = originalPosition;
            }
            else if (collider.CompareTag("Ground"))
            {
                originalPosition.x +=
                        this.numberOfGrounds
                        * this.distanceBetweenGrounds;
                go.transform.position = originalPosition;
            }
            else
            {
                originalPosition.x +=
                        this.numberOfPipes
                        * this.distanceBetweenPipes;
                go.transform.position = originalPosition;
            }

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



    private float DistanceBetweenObjects(GameObject first,GameObject second)
    {
        return Mathf.Abs(first.transform.position.x
            - second.transform.position.x);
    }
}
