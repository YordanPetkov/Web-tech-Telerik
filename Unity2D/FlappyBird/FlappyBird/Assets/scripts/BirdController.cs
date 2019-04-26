using UnityEngine;

public class BirdController : MonoBehaviour
{
    public float flapSpeed = 100f;
    public float forwardSpeed = 100f;
    public float maxFlapSpeed = 100f;

    private Rigidbody2D rb;
    private Animator animator;

    private bool didFlap;
    private bool isDead;

    public void Start()
    {
        this.rb = this.GetComponent<Rigidbody2D>();
        this.animator = this.GetComponent<Animator>();
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

        if(this.rb.velocity.y > 0)
        {
            this.rb.MoveRotation(30);
        }
        else if (!isDead)
        {
            var angle = velocity.y * 8;
            if(angle < -90)
            {
                angle = -90;
            }
            this.rb.MoveRotation(angle);
        }

        if (didFlap)
        {
            didFlap = false;

            this.rb.AddForce(new Vector2(0, flapSpeed), ForceMode2D.Impulse);

            var updatedVelocity = this.rb.velocity;
            if(updatedVelocity.y > this.maxFlapSpeed)
            {
                updatedVelocity.y = this.maxFlapSpeed;
                this.rb.velocity = updatedVelocity;
            }
        }
    }

    public void OnCollisionEnter2D(Collision2D collision )
    {
        if (collision.gameObject.CompareTag("Floor") || collision.gameObject.CompareTag("PipeCollision"))
        {
            this.isDead = true;
            this.animator.SetBool("BirdDead", true);

            this.forwardSpeed = 0;
        }
    }
    



}
