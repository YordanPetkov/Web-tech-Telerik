using System;
using UnityEngine;

public class BackgroundCollideControler : MonoBehaviour
{

    private int numberOfBackgrounds;
    private float distanceBetweenBackgrounds;

    private int numberOfGrounds;
    private float distanceBetweenGrounds;

    public void Start()
    {
        var backgrounds = GameObject.FindGameObjectsWithTag("Background");
        var grounds = GameObject.FindGameObjectsWithTag("Ground");
        this.numberOfBackgrounds = backgrounds.Length;
        this.numberOfGrounds = grounds.Length;

        if (this.numberOfBackgrounds < 2 || this.numberOfGrounds < 2)
        {
            throw new InvalidOperationException("You must have at least two backgrounds or grounds in your scene!");
        }

        this.distanceBetweenBackgrounds
            = Math.Abs(backgrounds[1].transform.position.x
            - backgrounds[0].transform.position.x);
        this.distanceBetweenGrounds
            = Math.Abs(grounds[1].transform.position.x
            - grounds[0].transform.position.x);
    }

    public void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Background"))
        {
            var background = collider.gameObject;
            var bgPosition = background.transform.position;
            bgPosition.x += this.numberOfBackgrounds * this.distanceBetweenBackgrounds;

            background.transform.position = bgPosition;
        }
        if (collider.CompareTag("Ground"))
        {

        }
    }
}
