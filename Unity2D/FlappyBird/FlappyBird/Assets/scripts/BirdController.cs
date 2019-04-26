using UnityEngine;
using UnityEngine.SceneManagement;
public class BirdController : MonoBehaviour
{
    public float flapSpeed = 100f;
    public float forwardSpeed = 100f;
    public float maxFlapSpeed = 100f;

    private Rigidbody2D rb;
    private Animator animator;

    private bool didFlap;
    private bool isDead;
    private bool gameStarted;
    private int highScore = 0;

    private Vector2 originalPosition;
    private GameObject startButton;
    public void Start()
    {
        this.originalPosition = new Vector2(
            this.transform.position.x,
            this.transform.position.y);
        this.startButton = GameObject.Find("StartButton");

        this.rb = this.GetComponent<Rigidbody2D>();
        this.animator = this.GetComponent<Animator>();

        this.forwardSpeed = 0;
        this.rb.gravityScale = 0;
        this.animator.enabled = false;
    }
    
    public void Update()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            if (!this.isDead)
            {
                if (!this.gameStarted)
                {
                
                    var renderer = this.startButton.GetComponent<SpriteRenderer>();
                    renderer.enabled = false;

                    this.forwardSpeed = 5;
                    this.rb.gravityScale = 1;
                    this.animator.enabled = true;

                    this.gameStarted = true;
                }


                this.didFlap = true;
            }
            else
            {
                SceneManager.LoadScene("PlayScene");
               
            }
            

        
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

            var renderer = this.startButton.GetComponent<SpriteRenderer>();
            renderer.enabled = true;

            var startButtonX = Camera.main.transform.position.x;
            var startButtonY = Camera.main.transform.position.y;

            var startButtonPosition = this.startButton.transform.position;
            startButtonPosition.x = startButtonX;
            startButtonPosition.y = startButtonY;
            this.startButton.transform.position = startButtonPosition;
        }
    }
    



}
