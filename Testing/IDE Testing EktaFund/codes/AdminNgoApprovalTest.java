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
public class AdminNgoApprovalTest {
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
  public void adminNgoApproval() {
    driver.get("https://ektafund.onrender.com/");
    driver.manage().window().setSize(new Dimension(1294, 814));
    driver.findElement(By.cssSelector(".land-getstarted > img")).click();
    driver.findElement(By.cssSelector(".land-option-button:nth-child(1) > .land-option-image")).click();
    driver.findElement(By.id("userType")).click();
    {
      WebElement dropdown = driver.findElement(By.id("userType"));
      dropdown.findElement(By.xpath("//option[. = 'Admin']")).click();
    }
    driver.findElement(By.id("form2Example17")).click();
    driver.findElement(By.id("form2Example17")).sendKeys("info.ektafund@gmail.com");
    driver.findElement(By.id("form2Example27")).click();
    driver.findElement(By.id("form2Example27")).sendKeys("meua sxra efml mkni");
    driver.findElement(By.cssSelector(".btn")).click();
    driver.findElement(By.cssSelector("tr:nth-child(4) .status-icon:nth-child(1)")).click();
    assertThat(driver.switchTo().alert().getText(), is("Feed The Hungry has been approved."));
    driver.close();
  }
}
