using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class InfoHandler : MonoBehaviour
{
    public Text title;
    public Text author;
    public Text bio;
    public Sprite image;
    // Start is called before the first frame update
    void Start()
    {
        image = Resources.Load<Sprite>(DefaultTrackableEventHandler.calledName);
        title.text = TextHandler.titleToSend;
        author.text = TextHandler.authorToSend;
        bio.text = TextHandler.bioToSend;
        Debug.Log(TextHandler.titleToSend);
    }

    // Update is called once per frame
}
