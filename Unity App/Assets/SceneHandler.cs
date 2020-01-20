using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class SceneHandler : MonoBehaviour
{
  public void GoToInfo(){
      Debug.Log("GoToInfo triggered");
      SceneManager.LoadScene("INFO");
  }
  public void GoToUser(){
    SceneManager.LoadScene("user");
  }
  public void GoToCamera(){
      SceneManager.LoadScene("SampleScene");
  }
}
