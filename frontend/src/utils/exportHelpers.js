export const downloadCSV = (data) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => 
    Object.values(obj)
      .map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      )
      .join(',')
  ).join('\n');

  const csvContent = `${headers}\n${rows}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};