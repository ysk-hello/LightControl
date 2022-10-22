using System.IO.Ports;

namespace LightControlConsole
{
    internal class Program
    {
        static Dictionary<string, string> _cmdDic = new Dictionary<string, string>()
        {
            { "ON", "on" },
            { "NL", "nl" },
            { "OFF", "off" }
        };

        static void Main(string[] args)
        {
            var cmd = args[0];

            if (!_cmdDic.ContainsKey(cmd))
            {
                Console.WriteLine($"command error: {cmd}");
                return;
            }

            var port = new SerialPort("/dev/ttyACM0");

            try
            {
                if (!port.IsOpen)
                {
                    port.Open();
                    Console.WriteLine("opend.");
                }
                else
                {
                    Console.WriteLine("port has already opend.");
                }

                for (int i = 0; i < 3; i++)
                {
                    port.Write(_cmdDic[cmd]);
                    Console.WriteLine($"write[{i}]: {cmd}");
                    Thread.Sleep(1000);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"exception: {ex.ToString()}");
            }
            finally
            {
                port.Close();
                Console.WriteLine("closed.");
            }
        }
    }
}