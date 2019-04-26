using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdController : MonoBehaviour
{
    public float flapSpeed = 100f;
    public float forwardSpeed = 100f;

    private Rigidbody2D rb;
    private bool didFlap;
    private bool isDead;

    public void Start()
    {
        this.rb = this.GetComponent<Rigidbody2D>();
    }
    
    public void Update()
    {
        if (Input.GetButtonDown("Fire1") && !this.isDead)
        {
            this.didFlap = true;
        }
    }

    public void FixedUpdate()
    {
        //this.rigidbody.AddForce(new Vector2(this.forwardSpeed, 0));
        var velocity = this.rb.velocity;
        velocity.x = this.forwardSpeed;
        this.rb.velocity = velocity;

        if (didFlap)
        {
            didFlap = false;

            this.rb.AddForce(new Vector2(0, flapSpeed));
        }
    }

    public void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Floor"))
        {
            this.isDead = true;
        }
    }
}
