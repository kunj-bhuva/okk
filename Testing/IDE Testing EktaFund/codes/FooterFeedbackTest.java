// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class FooterFeedbackTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void footerFeedback() {
    driver.get("https://ektafund.onrender.com/");
    driver.manage().window().setSize(new Dimension(1294, 814));
    assertThat(driver.findElement(By.cssSelector(".footer-section:nth-child(1) > h3")).getText(), is("About Us"));
    driver.findElement(By.linkText("Website Review")).click();
    driver.findElement(By.cssSelector(".websitereview-title")).click();
    assertThat(driver.findElement(By.cssSelector(".websitereview-title")).getText(), is("Website Review"));
    driver.close();
    driver.findElement(By.cssSelector(".footer-container")).click();
  }
}
