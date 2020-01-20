using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.IO;
using System.Net;

public class TextHandler : MonoBehaviour
{
    public TextMeshPro title;
    public TextMeshPro author;
    public TextMeshPro year;
    public TextMeshPro style;
    public string previousText;
    public string currentText;
    public static string titleToSend;
    public static string authorToSend;
    public static string yearToSend;
    public static string styleToSend;
public static string bioToSend;
    // Start is called before the first frame update
    void Start()
    {
        previousText = "previousText";
        title.text = "";
        currentText = "";
        // anyName.text = DefaultTrackableEventHandler.thisIsAUsername;
        // Debug.Log(anyName.text);
    }

    // Update is called once per frame
    void Update()
    {
        Debug.Log(DefaultTrackableEventHandler.calledName);
        currentText = DefaultTrackableEventHandler.calledName;
    Debug.Log(currentText + " <- current Text");
        if(previousText != currentText){
        GetPainting();
        
        }
    }
    public void GetPainting(){
           Debug.Log("GetPainting() fired!");
string html = string.Empty;
            string url = @"http://10.3.208.140:3001/api/getPaintings?name=" + currentText;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse()) using (Stream stream = response.GetResponseStream()) using (StreamReader reader = new StreamReader(stream))
            {
                html = reader.ReadToEnd();
                 previousText = title.text;
            Debug.Log(html);
            Painting Paint = JsonUtility.FromJson<Painting>(html);
            Debug.Log(Paint.paintingName);
            
            currentText = previousText;
            title.text = Paint.paintingName;
            author.text = Paint.artistName;
            year.text = Paint.created;
            style.text = Paint.period;

            titleToSend = Paint.paintingName;
            authorToSend = Paint.artistName;
            yearToSend = Paint.created;
            styleToSend = Paint.period;
            bioToSend = Paint.bio;
            }
           
            
    }
}

[System.Serializable]
public class Painting{
    public int id;
    public string paintingTag;
    public string paintingName;
    public string artistName;
    public string bio;
    public string dimensions;
    public string location;
    public string created;
    public string period;
    public string path;
}
