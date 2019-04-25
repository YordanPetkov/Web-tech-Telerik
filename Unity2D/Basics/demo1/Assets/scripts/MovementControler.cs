using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovementControler : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	public float speed = 0.05f;
	// Update is called once per frame
	void Update () {
		var position = this.transform.position;
		position.x += speed;
		this.transform.position = position;
	}
}
