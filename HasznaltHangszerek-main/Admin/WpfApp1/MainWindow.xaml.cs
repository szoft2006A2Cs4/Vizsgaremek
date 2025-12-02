using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Cmp;
using Org.BouncyCastle.Crypto.Tls;
using ScottPlot;
using ScottPlot.WPF;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using WpfApp1.DbAccess;
using WpfApp1.Model;
using System.Reflection;
using OpenTK.Graphics.OpenGL;
using ScottPlot.Plottables;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        const string _conn = "server=localhost;port=3306;uid=root;pwd=;database=hasznalthangszerek";
        List<object> users = new List<object>();
        List<object> orders = new List<object>();
        List<object> instruments = new List<object>();
        ListBox listbox = new ListBox();
        StackPanel field;
        object selectedItem;

        public MainWindow()
        {
            InitializeComponent();
            Loaded += MyWindowLoaded;
        }
        private void Window_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                DragMove();
            }
        }
        private void MyWindowLoaded(object sender, RoutedEventArgs e)
        {
            using (var conn = new MySqlConnection(_conn))
            {
                conn.Open();

                foreach (var user in new DbUser(conn).ReadAll())
                {
                    users.Add(user);
                }

                foreach (var order in new DbOrderInfo(conn).ReadAll())
                {
                    orders.Add(order);
                }
                foreach (var instrument in new DbInstrument(conn).ReadAll())
                {
                    instruments.Add(instrument);
                }
            }
        }
        private void btnClose_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
        private void btnMinimize_Click(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }
        private void LBIUsers_Selected(object sender, RoutedEventArgs e)
        {
            Refresh();
            ListBoxCreate(users);
            
        }
        private void LBIOrders_Selected(object sender, RoutedEventArgs e)
        {
            Refresh();
            ListBoxCreate(orders);
        }
        private void LBIStatistics_Selected(object sender, RoutedEventArgs e)
        {
            Refresh();

            Grid ChartField = new Grid();
            Grid.SetColumnSpan(ChartField, 2);
            Body.Children.Add(ChartField);

            WpfPlot wpfplot = new WpfPlot();
            Plot plot = wpfplot.Plot;


            double[] values = StatisticsByMonth().Select(x=>x.Value).ToArray();
            plot.Add.Bars(values);
            plot.Axes.Margins(bottom: 0);

            Tick[] ticks =
                    {
                        new(0, "Január"),
                        new(1, "Február"),
                        new(2, "Március"),
                        new(3, "Április"),
                        new(4, "Május"),
                        new(5, "Június"),
                        new(6, "Július"),
                        new(7, "Augusztus"),
                        new(8, "Szeptember"),
                        new(9, "Október"),
                        new(10, "November"),
                        new(11, "December")
                    };

            plot.Axes.Bottom.TickGenerator = new ScottPlot.TickGenerators.NumericManual(ticks);
            plot.Axes.Bottom.TickLabelStyle.Rotation = 45;
            plot.Axes.Bottom.TickLabelStyle.Alignment = Alignment.MiddleLeft;
            wpfplot.UserInputProcessor.Disable();

            float largestLabelWidth = 0;
            using Paint paint = Paint.NewDisposablePaint();
            foreach (Tick tick in ticks)
            {
                PixelSize size = plot.Axes.Bottom.TickLabelStyle.Measure(tick.Label, paint).Size;
                largestLabelWidth = Math.Max(largestLabelWidth, size.Width);
            }

            plot.Axes.Bottom.MinimumSize = largestLabelWidth;
            plot.Axes.Right.MinimumSize = largestLabelWidth;

            ChartField.Children.Add(wpfplot);
        }
        private void ListBoxCreate(List<object> listtype)
        {

            listbox.ItemsSource = listtype;
            listbox.SelectionChanged += CreateListBoxItemField;

            Body.Children.Add(listbox);
        }
        private void Refresh()
        {
            Body.Children.Clear();
        }
        private void CreateListBoxItemField(object sender, SelectionChangedEventArgs e)
        {
            Body.Children.Remove(field);
            field = new StackPanel();
            selectedItem =  listbox.SelectedItem;

            if (selectedItem == null) 
            {
                return;
            }

            foreach (var property in selectedItem.GetType().GetProperties())
            {
                
                Grid grid = new Grid();

                grid.ColumnDefinitions.Add(new ColumnDefinition 
                { 
                    Width = GridLength.Auto
                });
                grid.ColumnDefinitions.Add(new ColumnDefinition 
                { 
                    Width = new GridLength(1, GridUnitType.Star)
                });

                grid.RowDefinitions.Add(new RowDefinition{
                    Height = new GridLength(4, GridUnitType.Star)
                });
                grid.RowDefinitions.Add(new RowDefinition
                {
                    Height = new GridLength(1, GridUnitType.Star)
                });

                System.Windows.Controls.Label label = new System.Windows.Controls.Label();
                label.Content = $"{property.Name}: ";
                label.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                Grid.SetColumn(label, 0);
                Grid.SetRow(label, 0);
                label.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;

                TextBox textbox = new TextBox();
                textbox.BorderBrush = Brushes.Transparent;
                textbox.Background = Brushes.Transparent;
                textbox.Width = 120;
                textbox.Text = property.GetValue(selectedItem).ToString();
                Grid.SetColumn(textbox, 1);
                Grid.SetRow(textbox, 0);
                textbox.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;

                grid.Children.Add(label);
                grid.Children.Add(textbox);
                field.Children.Add(grid);
            }

            Button Modify = new Button();
            Grid.SetRow(Modify, 1);
            Modify.Width = 100;
            Modify.Content = "Módosítás";
            Modify.AddHandler(Button.ClickEvent, new RoutedEventHandler(btnModify_Click), true);
            field.Children.Add(Modify);

            Button Remove = new Button();
            Grid.SetRow(Remove, 1);
            Remove.Width = 100;
            Remove.Content = "Törlés";
            Remove.AddHandler(Button.ClickEvent, new RoutedEventHandler(btnRemove_Click), true);
            field.Children.Add(Remove);

            Button Create = new Button();

            Grid.SetColumn(field, 1);
            Body.Children.Add(field);

        }
        public void btnModify_Click(object sender, RoutedEventArgs e)
        {
            if (selectedItem == null) 
            {
                MessageBox.Show("Nincs kiválasztott alany!");
                return;
            }

            var data = field.Children.OfType<Grid>().SelectMany(d => d.Children.OfType<TextBox>()).ToList();
            User user = new User()
            {
                Id = int.Parse(data[0].Text),
                Name = data[1].Text,
                Email = data[2].Text,
                Phone = int.Parse(data[3].Text),
                Password = data[4].Text,
                Review = int.Parse(data[5].Text),
                PostalCode = int.Parse(data[6].Text),
                City = data[7].Text,
                streetHnum = data[8].Text
            };

            using (var conn = new MySqlConnection(_conn))
            {
                conn.Open();

                switch (selectedItem) 
                {
                    case User:
                        DbUser dbuser = new DbUser(conn);
                        dbuser.Update(user.Id, user);
                        users.Clear();
                        foreach(var u in new DbUser(conn).ReadAll())
                        {
                            users.Add(u);
                        }
                        listbox.ItemsSource = null;
                        listbox.ItemsSource = users;
                        selectedItem = null;
                        break;

                    default:
                        break;
                }

            }
        }
        public void btnRemove_Click(object sender, RoutedEventArgs e)
        {
            if (selectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztott alany!");
                return;
            }

            using (var conn = new MySqlConnection(_conn))
            {
                conn.Open();

                switch (selectedItem)
                {
                    case User u:
                        DbUser dbuser = new DbUser(conn);
                        dbuser.Delete(u.Id);
                        users.Clear();
                        foreach (var user in dbuser.ReadAll())
                        {
                            users.Add(user);
                        }
                        listbox.ItemsSource = null;
                        listbox.ItemsSource = users;
                        selectedItem = null;
                        break;

                    default:
                        break;
                }
            }
        }
        public Dictionary<string, double> StatisticsByMonth()
        {
            Dictionary<string, double> results = new Dictionary<string, double>()
            {
                {"January", 0},
                {"Feburary", 0 },
                {"March", 0 },
                {"April", 0 },
                {"May", 0 },
                {"June", 0},
                {"July", 0},
                {"August", 0},
                {"September", 0 },
                {"October", 0},
                {"November", 0},
                {"December", 0}
            };
            Dictionary<string, double> readData = new Dictionary<string, double>();

            using (var conn = new MySqlConnection(_conn))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"SELECT MONTHNAME(dateOfPurchase) as months, Count(*) FROM orderinfo GROUP BY months ORDER BY month(dateOfPurchase);";
                    using (var reader = cmd.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            readData.Add(reader.GetString(0), reader.GetInt32(1));
                        }
                    }
                }
            }

            foreach(var rky in results)
            {
                foreach (var rDky in readData)
                {
                    if (rky.Key == rDky.Key)
                    {
                        results[rky.Key] = rDky.Value;
                    }
                }
            }
            return results;
        }
    }
}