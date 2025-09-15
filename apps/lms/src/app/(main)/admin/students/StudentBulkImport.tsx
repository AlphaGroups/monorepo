import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ImportResult {
  id: string;
  name: string;
  email: string;
  studentId: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

const StudentBulkImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ImportResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setResults([]);
      } else {
        toast.error('Please select a CSV file');
      }
    }
  };

  const downloadTemplate = () => {
    const csvContent = `name,email,student_id,phone,class_ids,date_of_birth
John Doe,john.doe@example.com,STU001,(555) 123-4567,"class-1,class-2",1995-06-15
Jane Smith,jane.smith@example.com,STU002,(555) 987-6543,class-1,1996-03-22
Mike Johnson,mike.johnson@example.com,STU003,(555) 456-7890,"class-2,class-3",1995-11-08`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const simulateImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);
    
    // Simulate reading CSV and processing
    const mockResults: ImportResult[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        studentId: 'STU001',
        status: 'success',
        message: 'Student imported successfully'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        studentId: 'STU002',
        status: 'success',
        message: 'Student imported successfully'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        studentId: 'STU003',
        status: 'warning',
        message: 'Student imported but some classes not found'
      },
      {
        id: '4',
        name: 'Invalid User',
        email: 'invalid-email',
        studentId: 'STU004',
        status: 'error',
        message: 'Invalid email format'
      }
    ];

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setResults(mockResults);
    setImporting(false);

    // Make API call to import students
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/students/bulk-import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || mockResults);
        toast.success(`Import completed! ${data.successful || 3} students imported successfully.`);
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Import failed. Please try again.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const warningCount = results.filter(r => r.status === 'warning').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bulk Import Students</h1>
        <p className="text-muted-foreground">Import multiple students from a CSV file</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload & Import</TabsTrigger>
          <TabsTrigger value="results" disabled={results.length === 0}>
            Import Results {results.length > 0 && `(${results.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import Instructions</CardTitle>
              <CardDescription>
                Follow these steps to import students successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 1: Download Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Download our CSV template with the required columns and example data.
                  </p>
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV Template
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 2: Prepare Your Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fill in student information in the template</li>
                    <li>• Ensure email addresses are unique</li>
                    <li>• Use comma-separated class IDs</li>
                    <li>• Save as CSV format</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                Select your prepared CSV file to import students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="csv-file">CSV File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {file && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      {file.name}
                    </div>
                  )}
                </div>
              </div>

              {importing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Importing students...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <Button 
                onClick={simulateImport} 
                disabled={!file || importing}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {importing ? 'Importing...' : 'Import Students'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Successful</p>
                        <p className="text-2xl font-bold">{successCount}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Warnings</p>
                        <p className="text-2xl font-bold">{warningCount}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Errors</p>
                        <p className="text-2xl font-bold">{errorCount}</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Import Results</CardTitle>
                  <CardDescription>
                    Detailed results for each student record
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Status</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(result.status)}
                                {getStatusBadge(result.status)}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{result.name}</TableCell>
                            <TableCell>{result.email}</TableCell>
                            <TableCell>{result.studentId}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {result.message}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentBulkImport;